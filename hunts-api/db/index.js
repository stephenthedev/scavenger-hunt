const MongoClient = require('mongodb').MongoClient;
const secrets = require(__dirname + '/../../secrets.json');

// Connection URL
const url = secrets.url;

// Use connect method to connect to the server
module.exports = function () {
  return MongoClient.connect(url)
    .then(client => client.db('scavenger-hunt'))
    .catch(e => {
      console.error('ERROR CONNECTING TO MONGO', e);
    });
};
