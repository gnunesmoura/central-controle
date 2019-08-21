const express = require('express');
const client = require('../utils/elastic-search-client');

const router = express.Router();
const logger = require('./../utils/logger');

router.post('/', (req, res) => {
  logger.info(req.body);
  logger.info(req.headers);
  logger.info("asdfafasfasfasdfasdfas");

  client.cluster.health({}, (err, resp, status) => {
    res.status(200).send({ data: resp });
  });
});

module.exports = router;
