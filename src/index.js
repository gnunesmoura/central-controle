// Making environment configuration with nconf and the database.
require('./env-config');
require('./db-config');
const { ApolloServer } = require('apollo-server');
const { mergeTypeDefs, mergeResolvers } = require('graphql-toolkit');
const { connection } = require('mongoose');
const sensorData = require('./sensor-data');
const { buildAccountsGraphQL } = require('./accounts');

const accounts = buildAccountsGraphQL(connection);

const typeDefs = mergeTypeDefs([
  accounts.typeDefs,
  sensorData.typeDefs,
]);

const resolvers = mergeResolvers([
  accounts.resolvers,
  sensorData.resolvers,
]);

module.exports = new ApolloServer({
  resolvers,
  typeDefs,
  schemaDirectives: {
    ...accounts.schemaDirectives,
  },
  context: accounts.context,
  introspection: true,
  playground: true,
});
