// app.js

//pull in dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require(../logger);

//create app
const app = express();


//populate req.body with whatever users send

app.use(bodyParser.json());

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));

// alive route
app.use('/alive', require('./routes/alive'));

// Add require routers
const usersRoutes = require('./routes/users.js');
app.use('/users', usersRoutes);

// app.use('/somepath', require(./routes/somepath.js));

const loginRoutes = require('./routes/login.js');
app.use('/login', loginRoutes);

app.use('/version', require('./routes/version.js'));
app.use('/signup', require('./routes/signup.js'));


// listen on port 3000
app.listen(process.env.PORT || 3000, () => logger.info('App is listening...'));
