// routes/hunts.js

const express = require('express');
const router = express.Router();

const app = express();

router.post('/examplepost', (req,res) => {
  res.send('You have begun your hunt!');
});


module.exports = router;
