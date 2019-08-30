const { ApolloServer, gql } = require('apollo-server');
const resolvers = require('./graphql/resolvers');
const schema = require('./graphql/schema');
const context = require('./graphql/context');

/**
 * O context é um objeto que é passado para todos os resolvers, útil para passar conexões com o
 * banco de dados, váriaveis de ambiente, usuario cadastrado, etc...
 */
const server = new ApolloServer({
  resolvers,
  typeDefs: gql`${schema}`,
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    const user = getUser(token);

    return { user };
  },
});

module.exports = server;
