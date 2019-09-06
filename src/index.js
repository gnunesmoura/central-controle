require('./db-config');
const { ApolloServer } = require('apollo-server');

const accounts = require('./accounts');

module.exports = new ApolloServer({
  resolvers: accounts.resolvers,
  typeDefs: accounts.typeDefs,
  context: accounts.context,
  introspection: true,
  playground: true,
});
