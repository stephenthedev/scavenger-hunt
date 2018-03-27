// users-api/routes/signup.js

// Sprint 1: A mock API for signing up (#14)

//require express & create router
const express = require('express');
const router = express.Router();

// a test route
router.get('/testRoute', (req,res) => res.send('Test successful.'));

// check for content in username & password fields of body
// if data is missing, send invalid information error
// if something was entered for username and password,
// confirm the signup and display the information
router.post('/', (req, res) => {
  if(req.body.username)
  {
  if((!req.body.username) || (!req.body.password))
    {
   res.status(403).send('Invalid information.');
    }
  else
    {
   
    res.send('Account Confirmed. \n' +
    'Username: ' + req.body.username + '\n' +
    'Password: ' + req.body.password);
    }
  }
  //email 
if (req.body.email) 
  {
    var password=req.body.password;
    var Email_Check=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var Email=req.body.email;

      req.body.id="abcd-efgh-ijkl-mnop";//-->testing id


    if((!password)||password.length < 6||!password.match(/[a-z][0-9]+/i)||!Email_Check.test(Email))
    {
      res.status(401).send('"message": "Invalid Credentials"');
    }
    else{
      res.status(200).send(
    'id: ' + req.body.id + '\n' +
    'email: ' + req.body.email);


    }
  } 
  else
  {
     res.status(403).send('Invalid information.');
  }
});


//export so other modules can access
module.exports = router;
