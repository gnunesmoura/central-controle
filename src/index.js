const { ApolloServer, gql } = require('apollo-server');

const getUser = token => (token === 'tokenDeAcesso' ? ({ id: 12345, roles: ['user', 'admin'] }) : null);

/**
 * O context é um objeto que é passado para todos os resolvers, útil para passar conexões com o
 * banco de dados, váriaveis de ambiente, usuario cadastrado, etc...
 */
const server = new ApolloServer({
  typeDefs: gql`
  type Query {
    user (id: ID!): User
   }
   
   type User {
    id: ID!
    name: String!
   }`,
  resolvers: {
    users: (parent, args, context) => {
      // to-do throw an error.
      if (!context.user) return null;

      return ['bob', 'jake'];
    },
  },
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    const user = getUser(token);

    return { user };
  },
});

module.exports = server;

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
