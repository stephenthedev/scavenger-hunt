// process.js

// S4 | Create a process-image/:id route #68

const router = require('express').Router();

router.get('/process-image/:id', (req, res) => {
  res.json({id: 1, status: 'pending'})
});

module.exports = router;
