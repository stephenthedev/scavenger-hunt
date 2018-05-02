// process.js
const router = require('express').Router();

router.get('/:id', (req, res) => {
  res.json({id: 1, status: 'pending'})
});

router.get('/', (req, res) => {
  res.json([{id: 1, status: 'pending'}])
});

module.exports = router;
