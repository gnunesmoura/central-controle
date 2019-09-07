const nconf = require('nconf');
const { AccountsServer } = require('@accounts/server');
const { AccountsModule } = require('@accounts/graphql-api');
const { AccountsPassword } = require('@accounts/password');
const { DatabaseManager } = require('@accounts/database-manager');
const { Mongo } = require('@accounts/mongo');
const { validateNewUser } = require('./user-validation');

const buildAccountsGraphQL = (mongoConnection) => {
  const userStorage = new Mongo(mongoConnection);

  const accountsDb = new DatabaseManager({
    sessionStorage: userStorage,
    userStorage,
  });

  /**
   * Creating the accounts password service.
   *
   * validateNewUser option is called when a new user create an account
   * Inside we can apply our logic to validate the user fields
   */
  const accountsPassword = new AccountsPassword({
    validateNewUser,
  });

  // Create accounts server that holds a lower level of all accounts operations
  const accountsServer = new AccountsServer(
    { db: accountsDb, tokenSecret: nconf.get('tokenSecret') },
    { password: accountsPassword },
  );

  // Creates resolvers, type definitions, and schema directives used by accounts-js
  return AccountsModule.forRoot({ accountsServer });
};

module.exports = buildAccountsGraphQL;
