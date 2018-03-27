//login.js

const express = require('express');

const router = express.Router();

router.put('/', (req,res) => {
  if (req.body.password == '1234'){
    res.status(200).send
    ({
        "id":"abcd-efgh-ijkl-mnop",
        "email":"test@test.com"
    });
  }
  else{
    res.status(403).send
    ({
        "message": "Invalid Credentials"
    });
  }
});

module.exports = router;
