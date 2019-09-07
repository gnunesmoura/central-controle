// Making environment configuration with nconf and the database.
require('./env-config');
require('./db-config');
const { ApolloServer } = require('apollo-server');
const { mergeTypeDefs } = require('graphql-toolkit');
const { connection } = require('mongoose');

const accounts = require('./accounts')(connection);

const typeDefs = mergeTypeDefs([
  `
  type Book {
    title: String
  }

  type Query {
    book(id: Int!): Book
  }
`,
  accounts.typeDefs,
]);

const resolvers = [
  {
    Query: {
      book: id => ({ title: 'Harry Potter' }),
    },
  },
  accounts.resolvers,
];

module.exports = new ApolloServer({
  resolvers,
  typeDefs,
  context: accounts.context,
  introspection: true,
  playground: true,
});
