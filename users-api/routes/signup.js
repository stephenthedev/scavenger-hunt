// users-api/routes/signup.js

// Sprint 1: A mock API for signing up (#14)

// Sprint 3: Really signup a user (#42)

//require express & create router
const express = require('express');
const router = express.Router();

//require db
const getDb = require('../db');

// a test route
router.get('/testRoute', (req,res) => res.send('Test successful.'));

// check for content in username & password fields of body
// if data is missing, send invalid information error
// if something was entered for username and password,
// confirm the signup and display the information
router.post('/', (req, res) => {
  if((!req.body.username) || (!req.body.password))
  {
    res.status(403).send('Invalid information.');
  }
  else
  {
    getDb().then(db => {
      db.collection('users')
      .insert({
        user: req.body.username,
        pwd: req.body.password
      }, (err, result) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          res.send('Account Confirmed. \n' +
          'Username: ' + req.body.username + '\n' +
          'Password: ' + req.body.password);
        }
      })
    })
  }
});

//export so other modules can access
module.exports = router;
