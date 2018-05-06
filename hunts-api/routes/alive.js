const router = require('express').Router();
const getDb = require('../db');
const definition = require('../package.json');


<<<<<<< HEAD
 router.get('/', (req, res) => {


  getDb().then(db => {
    // db is available ere just like in:
    // http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/#insert-a-document






  res.json({
      message: 'Api is alive and mongo connection is good.'
=======
router.get('/', (req, res) => {
  getDb().then(db => {
    // db is available ere just like in:
    // http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/#insert-a-document
    res.json({
      message: 'Api is alive and mongo connection is good.',
      version: definition.version,
      time: new Date()
>>>>>>> d7d07ea5abda48d5a1e5ea722bd4542262fb39d3
    })
  }).catch(e => res.status(500).json(e));
});

<<<<<<< HEAD







=======
>>>>>>> d7d07ea5abda48d5a1e5ea722bd4542262fb39d3
module.exports = router;
