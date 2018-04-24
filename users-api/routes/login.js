//login.js
const router = require('express').Router();
const getDb = require('../db');
const logger = require('../../logger');


router.post('/', (req,res) => {
  getDb().then(db => {
    db.collection('users').findOne(
      {username: req.body.username}, (err, user) => {
        if(err) {
          logger.error('ERROR.')
          return res.status(500).json(err)
        }
        if (user && user.password === req.body.password){
          logger.info('Login successful.')
          res.status(200).json({Message: "Login successful."});
        } else {
          logger.info("Invalid credentials.");
          res.status(403).json({Message: "Invalid credentials."});
        }
      });
    });
});

module.exports = router;
