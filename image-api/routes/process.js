const router = require('express').Router();
const getDb = require('../db');


router.get('/', (req, res) => {
  res.json([{id: 1, status: 'pending'}])
});

module.exports = router;
