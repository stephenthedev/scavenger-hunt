const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

// TODO Add require routers here
// app.use('/somepath', require(./routes/somepath.js));
app.use('/version', require('./routes/version.js'));

app.use('/hunts', require('./routes/hunts.js'));

app.listen(3000, () => console.log('App is listening...'));
