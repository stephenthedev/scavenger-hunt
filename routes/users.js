// users.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200);
	res.send('This is where we send user information.');
});

module.exports = router;
