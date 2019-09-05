const { ApolloServer } = require('apollo-server');
const { AccountsServer } = require('@accounts/server');
const { AccountsModule } = require('@accounts/graphql-api');
const { AccountsPassword } = require('@accounts/password');
const { DatabaseManager } = require('@accounts/database-manager');
const { Mongo } = require('@accounts/mongo');
const mongoose = require('mongoose');

const configureAuthServer = async () => {
  await mongoose.connect('mongodb://mongo:27017/central-acesso', {
    useNewUrlParser: true,
  });

  const { connection } = mongoose;

  const userStorage = new Mongo(connection);

  const accountsDb = new DatabaseManager({
    sessionStorage: userStorage,
    userStorage,
  });

  const accountsPassword = new AccountsPassword({
    // This option is called when a new user create an account
    // Inside we can apply our logic to validate the user fields
    validateNewUser: (user) => {
      // For example we can allow o@graphql-modules/corenly some kind of emails
      if (user.email.endsWith('.xyz')) {
        throw new Error('Invalid email');
      }
      return user;
    },
  });

  // Create accounts server that holds a lower level of all accounts operations
  const accountsServer = new AccountsServer(
    { db: accountsDb, tokenSecret: 'secret' },
    {
      password: accountsPassword,
    },
  );

  // Creates resolvers, type definitions, and schema directives used by accounts-js
  const accountsGraphQL = AccountsModule.forRoot({
    accountsServer,
  });

  return new ApolloServer({
    resolvers: accountsGraphQL.resolvers,
    typeDefs: accountsGraphQL.typeDefs,
    context: accountsGraphQL.context,
    introspection: true,
    playground: true,
  });
};


module.exports = configureAuthServer;
