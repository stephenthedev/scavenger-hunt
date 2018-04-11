// routes/hunts.js

const express = require('express');
const router = express.Router();
const getDb = require('../db');


router.post('/', (req,res) => {
  getDb().then(db => {

    // db is available here just like in:
    // http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/#insert-a-document
    const collection = db.collection('hunts');
      // Insert some documents
      collection.insertMany([
        req.body
      ], function(err, result) {
      if (err) return res.status(500).json(err);

      res.json(result);
      });
  }).catch(e => res.status(500).json(e));
  });

  router.post('/join', (req, res) => {
  if (req.body.id != 'abcd-efgh-ijkl') {
    res.status(404).json({
      message: 'ID not found'
    })
  } else {
    res.json({
      "name": "Some Hunt",
      "lat": 42.12323,
      "long": -79.33171,
      "radius": 1,
      "items": [
        {
          "label": "Fountain",
          "lat": 42.12323,
          "long": -79.33171,
          "usersWhoHaveCompletedIt": [ "test@test.com", "test2@test2.com"]
        }
      ]
    });
  }
});

module.exports = router;
