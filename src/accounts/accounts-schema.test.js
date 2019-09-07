/* eslint-disable no-undef */
require('../env-config');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { graphql, GraphQLError } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');
const buildAccountsGraphQL = require('./index');

const rootValue = {};
let mongoServer;
let typeDefs;
let resolvers;
let context;
let schema;

const queries = {
  createUser: username => `
    mutation {
      createUser(
        user: { username: "${username}", email: "${username}@gmail.com", password: "senha" }
      ) 
    }  
  `,
};

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  return mongoServer
    .getConnectionString()
    .then(mongoUri => mongoose.connect(mongoUri, { useNewUrlParser: true }))
    .then(() => buildAccountsGraphQL(mongoose.connection))
    .then((accounts) => {
      typeDefs = accounts.typeDefs;
      resolvers = accounts.resolvers;
      context = accounts.context;
      schema = makeExecutableSchema({ typeDefs, resolvers });
    });
});

afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  await mongoose.disconnect();
  await new Promise(resolve => setTimeout(resolve, 100));
  await mongoServer.stop();
}, 5000);


it('createUser mutation returns only data:createUser = null on sucess', async () => {
  const result = await graphql(schema, queries.createUser('Gustavo'), rootValue, context);

  expect(result).toEqual({ data: { createUser: null } });
}, 100000);

it('createUser mutation returns data:createUser = null and errors on failure', async () => {
  const result = await graphql(schema, queries.createUser('Gustavo'), rootValue, context);

  expect(result.data).toEqual({ createUser: null });
  expect(result.errors[0]).toEqual(expect.any(GraphQLError));
}, 100000);
