module.exports = `
type User {
  id: ID!
  name: String!
}

type Query {
  user (id: ID!): User
}
`;
