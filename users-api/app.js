// app.js

//pull in dependencies
const express = require('express');
const bodyParser = require('body-parser');

//create app
const app = express();

//populate req.body with whatever users send
app.use(bodyParser.json());

// Add require routers
app.use('/signup', require('./routes/signup.js'));

// root
app.get('/', (req, res) => {
  res.send('You are home.');
});

// test path
app.get('/testpath', (req, res) => {
  res.send('Test path successful.');
});

//example post
// check for content in username & password fields of body
// if data is missing, send invalid information error
// if something was entered for username and password,
// confirm the signup and display the information
app.post('/mocksignup', (req, res) => {
  if((!req.body.username) || (!req.body.password))
  {
    res.status(403).send('Invalid information.');
  }
  else
  {
    res.send('Welcome. \n' +
    'Username: ' + req.body.username + '\n' +
    'Password: ' + req.body.password);
  }
});

// listen on port 3000
app.listen(3000, () => {
  console.log("App is listening on localhost:3000...");
});
