//hunts.js

// Ray Ashton, Noah Asklar

// require express
const express = require('express');

//use express to make a router
const router = express.Router();

router.get('/test', (req, res) => res.send('TEST OK'));

module.exports = router;
