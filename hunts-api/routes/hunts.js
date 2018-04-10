// routes/hunts.js

const express = require('express');
const router = express.Router();
const getDb = require('../db');


router.get('/', (req,res) => {
    getDb().then(db => {
  db.collection('hunts')
  .find({})
  .toArray((err, results) =>{
    if(err){
      res.status(500).json(err);
    }else{
      res.json(results);
    }
  });
  }).catch(e => res.status(500).json(e));
});

  router.post('/join', (req, res) => {
  if (req.body.id != 'abcd-efgh-ijkl') {
    res.status(404).json({
      message: 'ID not found'
    })
  } else {
    res.json({
      "name": "Some Hunt",
      "lat": 42.12323,
      "long": -79.33171,
      "radius": 1,
      "items": [
        {
          "label": "Fountain",
          "lat": 42.12323,
          "long": -79.33171,
          "usersWhoHaveCompletedIt": [ "test@test.com", "test2@test2.com"]
        }
      ]
    });
  }
});

module.exports = router;
