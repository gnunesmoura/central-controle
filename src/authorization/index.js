
const typeDefs = `
  type Book {
    title: String
  }

  type Query {
    book(id: Int!): Book
  }
`;

const myResolvers = {
  Query: {
    book: id => ({ title: 'Harry Potter' }),
  },
};

module.exports = {
  resolvers: myResolvers,
  typeDefs,
};
