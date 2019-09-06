const mongoose = require('mongoose');
const nconf = require('nconf');
const logger = require('./logger');

mongoose.connect(nconf.get('database:connectString'), { useNewUrlParser: true });

mongoose.connection.on('error', (err) => {
  throw err;
});

mongoose.connection.once('open', () => logger.info('Connected to mongodb'));
