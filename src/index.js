// Making environment configuration with nconf and the database.
require('./env-config');
require('./db-config');
const { ApolloServer } = require('apollo-server');
const { mergeTypeDefs } = require('graphql-toolkit');
const { connection } = require('mongoose');
const authorization = require('./authorization');
const { buildAccountsGraphQL } = require('./accounts');

const accounts = buildAccountsGraphQL(connection);

const typeDefs = mergeTypeDefs([
  authorization.typeDefs,
  accounts.typeDefs,
]);

const resolvers = [
  authorization.resolvers,
  accounts.resolvers,
];

module.exports = new ApolloServer({
  resolvers,
  typeDefs,
  context: accounts.context,
  introspection: true,
  playground: true,
});
