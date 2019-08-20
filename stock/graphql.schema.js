/**
 * This file describe all relations, mutations and the data avaible on the API.
 */

const { buildSchema } = require('graphql');

// GraphQL schema
const schema = buildSchema(`
  input DimensionsInput {
    weigth: Float!
    x: Float!
    y: Float!
    z: Float!
  }

  input AddItemInput {
    _id: String
    name: String!
    amountOnStock: Int
    buyPrice: Float
    salePrice: Float
    dimensions: DimensionsInput
  }

  input FindItemInput {
    _id: String
    name: String
    amountOnStock: Int
    buyPrice: Float
    salePrice: Float
    dimensions: DimensionsInput
  }

  type Item {
    _id: String
    name: String!
    buyPrice: Float
    salePrice: Float
    amountOnStock: Int
    dimensions: Dimensions
  }

  type Dimensions {
    weigth: Float!
    x: Float!
    y: Float!
    z: Float!
  }

  type Query {
    items(amount: Int = 0): [Item]!
    item(_id: String!): Item!
  }

  type Mutation {
    addItem(item: AddItemInput!): Item!
    rmItem(_id: String!): Item!
    addAmount(_id: String!, amount: Int!): Item!
    rmAmount(_id: String!, amount: Int!): Item!
  }
`);

module.exports = schema;
