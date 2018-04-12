// routes/hunts.js

const express = require('express');
const router = express.Router();
const getDb = require('../db/index.js');

// TODO: remove when deployed to production, this is for debugging only !!
router.get('/list', (req, res) => {
  console.log("Connecting to Mongo ...");
  getDb().then(db => {
    console.log("Connected");
    db.collection('hunts').find(req.params.id).toArray((err, docs) => {
  		if(err){
  			return res.status(500).json(err)
  		}
      console.log("200: returning 'hunts' collection to /list");
      res.status(200).json(docs);
  	});
  }).catch(e => res.status(500).json(e));
});

router.put('/:id', (req, res) => {
  if(!req.body.email || !req.params.id){
    return res.status(403).json({message: "Invalid information."});

  }
  console.log("Connecting to Mongo ...");
  getDb().then(db => {
    console.log("Connected to Mongo");
    db.collection('hunts')
    .findOneAndUpdate({id: req.params.id},{
      $push: {
        currentUsers: req.body.email
      }
    }, {
      upsert: true
    }, (err, result) => {
      if(err){
        return res.status(500).json(err)
      }
      console.log("200: added " + req.body.email + " to 'hunts' id:" + req.params.id);
      res.status(200).json({message: "Added user to hunt"});
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
