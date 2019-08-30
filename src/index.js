const { ApolloServer, gql } = require('apollo-server');

const getUser = token => (token === 'tokenDeAcesso' ? ({ id: 12345, name: 'bobão', roles: ['user', 'admin'] }) : null);

/**
 * O context é um objeto que é passado para todos os resolvers, útil para passar conexões com o
 * banco de dados, váriaveis de ambiente, usuario cadastrado, etc...
 */
const server = new ApolloServer({
  resolvers: {
    Query: {
      user: (parent, args, context) => {
        // to-do throw an error.
        if (!context.user) return null;

        return context.user;
      },
    },
  },
  typeDefs: gql`
  type User {
    id: ID!
    name: String!
  }
  
  type Query {
    user (id: ID!): User
  }
  `,
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    const user = getUser(token);

    return { user };
  },
});

module.exports = server;
