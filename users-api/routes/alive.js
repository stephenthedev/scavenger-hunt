const router = require('express').Router();
const getDb = require('../db');


router.get('/', (req, res) => {
  getDb().then(db => {

    // db is available here just like in:
    // http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/#insert-a-document

    res.json({
      message: 'Api is alive and mongo connection is good.'
    })
  }).catch(e => res.status(500).json(e));
});

module.exports = router;