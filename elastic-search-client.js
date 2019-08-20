/**
 * This file discribe the connection to the ElasticSearch.
 * Import this file in any module that uses data from the ElasticSearch.
 */

const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'http://localhost:9200',
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
});

module.exports = client;
