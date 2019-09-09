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
  createUser: (username, password = 'senha') => `
    mutation {
      createUser(
        user: { username: "${username}", email: "${username}@gmail.com", password: "${password}" }
      )
    }
  `,
  authenticateUser: (username, password) => `
    mutation Auth {
      authenticate(
        serviceName: "password"
        params: { password: "${password}", user: { username: "${username}", email: "${username}@gmail.com" } }
      ) {
        tokens {
          accessToken
        }
      }
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
}, 500);

it('createUser mutation returns data:createUser = null and errors on failure', async () => {
  const result = await graphql(schema, queries.createUser('Gustavo'), rootValue, context);

  expect(result.data).toEqual({ createUser: null });
  expect(result.errors[0]).toEqual(expect.any(GraphQLError));
}, 500);

it('existing user can be authenticated', async () => {
  const result = await graphql(schema, queries.authenticateUser('Gustavo', 'senha'), rootValue, context);
  expect(result.data.authenticate.tokens.accessToken).toEqual(expect.any(String));
});

it('existing user won\'t authenticated with wrong password', async () => {
  const result = await graphql(schema, queries.authenticateUser('Gustavo', 'senhaerrada'), rootValue, context);
  expect(result.errors[0].message).toEqual('Invalid credentials');
});
