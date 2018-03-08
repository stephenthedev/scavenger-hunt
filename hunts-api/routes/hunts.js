// routes/hunts.js

const express = require('express');
const router = express.Router();


router.post('/', (req,res) => {
    res.json({
        name: 'Hunt 1'
    });
  });

module.exports = router;
