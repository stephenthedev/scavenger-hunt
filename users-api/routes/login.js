//login.js

const express = require('express');

const router = express.Router();

router.get('/test', (req,res) => {

  res.send('Test OK');
  
});

router.post('/', (req,res) => {
  if (req.body.password == 'testpass'){
    res.send('Logged In !');
  }
  else{
    res.status(403).send('Wrong Pass !');
  }
});

module.exports = router;
