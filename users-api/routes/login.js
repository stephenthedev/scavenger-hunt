//login.js

const express = require('express');

const router = express.Router();

router.put('/', (req,res) => {
  if (req.body.password == '1234'){
    res.status(200).json
    ({
        "id":"abcd-efgh-ijkl-mnop",
        "email":"test@test.com"
    });
  }
  else{
    res.status(403).json
    ({
        "message": "Invalid Credentials"
    });
  }
});

module.exports = router;
