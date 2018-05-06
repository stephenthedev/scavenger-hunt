//login.js
const router = require('express').Router();
const getDb = require('../db');
<<<<<<< HEAD
const hash = require('./crypto');
=======
const logger = require('../../logger');
>>>>>>> 67745344d8e7d158a94d16eace9abc1135fa7aa9


router.post('/', (req,res) => {
  getDb().then(db => {
    db.collection('users').findOne(
      {email: req.body.email}, (err, user) => {
        if(err) {
          logger.error('ERROR.')
          return res.status(500).json(err)
        }
<<<<<<< HEAD
        if (user && user.pwd === hash(req.body.password)){
          console.log('Login successful.')
=======
        if (user && user.password === req.body.password){
          logger.info('Login successful.')
>>>>>>> 67745344d8e7d158a94d16eace9abc1135fa7aa9
          res.status(200).json({Message: "Login successful."});
        } else {
          logger.info("Invalid credentials.");
          res.status(403).json({Message: "Invalid credentials."});
        }
      });
    });
});

module.exports = router;
