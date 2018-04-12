
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


// TODO Add require routers here
// app.use('/somepath', require(./routes/somepath.js));

// alive route
app.use('/alive', require('./routes/alive'));

app.use('/version', require('./routes/version.js'));

app.use('/hunts', require('./routes/hunts.js'));

app.listen(process.env.PORT || 3000, () => console.log('App is listening...'));
