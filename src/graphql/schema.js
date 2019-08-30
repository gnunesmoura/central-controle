module.exports = `
type Token {
  token: String!
  expirationDate: String!
}

type User {
  id: ID!
  name: String!
}

type Query {
  user (id: ID!): User
  login(username: String!, password: String!): Token!
}
`;
