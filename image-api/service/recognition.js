// recognition.js

const fs = require('fs');
const RecognitionClient = require('../service/recognition.js');

const client = new RecognitionClient();

client.analyze(fs.readFileSync('./test.png').toString('base64'))
  .then(analysis => console.log(analysis))
  .catch(e => console.error('ERROR', e));


module.exports = rekognition;
