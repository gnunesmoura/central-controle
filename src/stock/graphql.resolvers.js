
/**
 * This file discribe all access to the data.
 */

const client = require('../elastic-search-client');


const items = (args) => {
  return client.search({
    index: 'nunes',
    type: 'iot', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { name: 'SmartGrow' },
      },
    },
  });
};

const addItem = (input) => {
  const item = new Item(input.item);
  return item.save();
};

const item = _id => Item.findOne({ _id });

const addAmount = ({ _id, amount }) => Item.findOne({ _id })
  .then((item) => {
    item.amountOnStock += amount;
    return Item.findOneAndUpdate({ _id }, item);
  });

const rmAmount = ({ _id, amount }) => addAmount({ _id, amount: -amount });

const rmItem = _id => Item.remove({ _id });

// Root resolver
const root = {
  item,
  items,
  addItem,
  rmItem,
  addAmount,
  rmAmount,
};

module.exports = root;
