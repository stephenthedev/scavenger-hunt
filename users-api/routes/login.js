//login.js
const router = require('express').Router();
const getDb = require('../db');
const hash = require('./crypto');


router.post('/', (req,res) => {
  getDb().then(db => {
    db.collection('users').findOne(
      {email: req.body.email}, (err, user) => {
        if(err) {
          console.log('ERROR.')
          return res.status(500).json(err)
        }
        if (user && user.pwd === hash(req.body.password)){
          console.log('Login successful.')
          res.status(200).json({Message: "Login successful."});
        } else {
          console.log("Invalid credentials.");
          res.status(403).json({Message: "Invalid credentials."});
        }
      });
    });
});

module.exports = router;
