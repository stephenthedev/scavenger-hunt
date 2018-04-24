//di/mock.js

class RekognitionMock {
  detectLabels(params, cb) {
    cb(
      null, // NO ERROR
      {
        Labels: [
         {
          Confidence: 99.25072479248047,
          Name: "People"
         },
         {
          Confidence: 99.25074005126953,
          Name: "Person"
         }
      ]
     } // RESULT
    )
  }
}

module.exports = RekognitionMock;
