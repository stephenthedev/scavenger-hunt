// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// TODO Add require routers here
const usersRoutes = require('./routes/users.js');
app.use('/routes/users', usersRoutes);
// app.use('/somepath', require(./routes/somepath.js));
app.use('/version', require('./routes/version.js'));

app.listen(3000, () => console.log('App is listening...'));
