// app.js

//pull in dependencies
const express = require('express');
const bodyParser = require('body-parser');

//create app
const app = express();

//populate req.body with whatever users send
app.use(bodyParser.json());

// Add require routers
const usersRoutes = require('./routes/users.js');
app.use('/routes/users', usersRoutes);
app.use('/version', require('./routes/version.js'));
app.use('/signup', require('./routes/signup.js'));


// listen on port 3000
app.listen(3000, () => console.log('App is listening...'));
