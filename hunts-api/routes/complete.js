// complete.js

const express = require('express');

const router = express.Router();

router.post('/', (req,res) => {
    if((req.body.id == 'abcd-efgh-ijkl-mnop') && (req.body.image == 'base64String')){
      res.status(200).json({
        "status" : "SUCCESS"
      });
    }
    else if (!req.body.id) {
      res.status(401).json({
        "status" : "FAILURE",
        "message": "Missing id"
      });
    }
    else if (!req.body.image) {
      res.status(401).json({
        "status" : "FAILURE",
        "message": "Missing image"
      });
    }
    
});

module.exports = router;
