//login.js
const router = require('express').Router();
const getDb = require('../db');

router.post('/', (req,res) => {
  getDb().then(db => {
    db.collection('users').findOne(
      {username: req.body.username}, (err, user) => {
        if(err) {
          console.log('ERROR.')
          res.json(err)
        }
        if (user && user.password === req.body.password){
          console.log('Login successful.')
          res.json({status: "Login successful."});
        } else {
          console.log("Invalid credentials.");
          res.json({status: "Invalid credentials."});
        }
      });
    });
});

module.exports = router;
