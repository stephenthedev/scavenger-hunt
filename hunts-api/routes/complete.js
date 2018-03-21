// complete.js

const express = require('express');

const router = express.Router();

router.post('/complete/item', (req,res) => {
    if((req.body.id == 'abcd-efgh-ijkl-mnop') && (req.body.image == 'base64String')){
      res.status(200).send('SUCCESS');
    }
    else if (!req.body.id) {
      res.status(401).send('Missing id');
    }
    else if (!req.body.image) {
      res.status(401).send('Missing image')
    }
});

module.exports = router;
