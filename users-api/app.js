// app.js

//pull in dependencies
const express = require('express');
const bodyParser = require('body-parser');

//create app
const app = express();

<<<<<<< HEAD
=======
//populate req.body with whatever users send
>>>>>>> f9fe8633f6d22197e129e9571b9c26cbc6530b2e
app.use(bodyParser.json());

// Add require routers
const usersRoutes = require('./routes/users.js');
app.use('/routes/users', usersRoutes);
<<<<<<< HEAD
// app.use('/somepath', require(./routes/somepath.js));
=======
>>>>>>> f9fe8633f6d22197e129e9571b9c26cbc6530b2e

const loginRoutes = require('./routes/login.js');
app.use('/login', loginRoutes);

app.use('/version', require('./routes/version.js'));
app.use('/signup', require('./routes/signup.js'));


// listen on port 3000
app.listen(3000, () => console.log('App is listening...'));
