// app.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const usersRoutes = require('./routes/users');

app.use('/users/', usersRoutes);

app.listen(3000, () => {
	console.log('Starting. Listening on port 3000...');
});
