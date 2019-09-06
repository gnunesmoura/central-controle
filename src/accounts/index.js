const { AccountsServer } = require('@accounts/server');
const { AccountsModule } = require('@accounts/graphql-api');
const { AccountsPassword } = require('@accounts/password');
const { DatabaseManager } = require('@accounts/database-manager');
const { Mongo } = require('@accounts/mongo');
const mongoose = require('mongoose');
const { validateNewUser } = require('./user-validation');

const { connection } = mongoose;

const userStorage = new Mongo(connection);

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
  { db: accountsDb, tokenSecret: 'secret' },
  { password: accountsPassword },
);

// Creates resolvers, type definitions, and schema directives used by accounts-js
const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

module.exports = accountsGraphQL;
