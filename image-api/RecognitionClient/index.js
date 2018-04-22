// di/index.js
const AWS = require('aws-sdk');
const MockClient = require('./mock');
// DI is short for Dependency Injection
// Benefits: Helps test and decouple code

class RecognitionClient {
  // This is DI
  constructor(rekognitionDep) {
    if (rekognitionDep != undefined) {
      this.rekognition = rekognitionDep;
    } else if(process.env.PROD_INSTANCE) {
      this.rekognition = new AWS.Rekognition({region: 'us-east-1'});
    } else {
      this.rekognition = new MockClient();
    }
  }

  getLabels(base64img, cb) {
    this.rekognition.detectLabels({
      Image: {
        Bytes: base64img
      },
      MaxLabels: 10,
      MinConfidence: 50
    }, cb);
  }
}

module.exports = RecognitionClient;
