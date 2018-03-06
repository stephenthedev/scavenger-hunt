// app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// TODO Add require routers here
// app.use('/somepath', require(./routes/somepath.js));

const loginRoutes = require('./routes/login.js');
app.use('/login', loginRoutes);
app.use('/test', loginRoutes);


app.use('/version', require('./routes/version.js'));

app.listen(3000, () => console.log('App is listening...'));
