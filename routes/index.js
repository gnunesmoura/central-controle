const express = require('express');
const client = require('./../elastic-search-client');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  console.log(req.headers);

  client.cluster.health({}, (err, resp, status) => {
    res.status(200).send({ data: resp });
  });
});

module.exports = router;
