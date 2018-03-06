//app.js

// Ray Ashton, Noah Asklar

// require statements
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const huntsRoute = require('./routes/hunts.js');
app.use('/hunts', huntsRoute);


app.get('/hunts', (req, res) => {
  res.send('Here is a list of hunts avaiable: ')
});

// Listen on port 3000
app.listen(3000, () => (
  console.log('App is running...')
));
