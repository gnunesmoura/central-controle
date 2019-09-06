const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.connect('mongodb://mongo:27017/central-acesso', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (err) => {
  logger.error(err);
});

db.once('open', () => logger.info('Connected to mongodb'));
