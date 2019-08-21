require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./utils/logger');
// const graphqlHTTP = require('express-graphql');
const indexRouter = require('./routes/index');

// const schema = require('./stock/graphql.schema');
// const root = require('./stock/graphql.resolvers');


// Create an express server and a GraphQL endpoint
const app = express();
app.use(morgan('common', { common: logger.info }));
app.use(cookieParser());
app.use(express.json());

app.use('/', indexRouter);
// app.use('/graphql', graphqlHTTP({
//   schema,
//   rootValue: root,
//   graphiql: true,
// }));

module.exports = app;
