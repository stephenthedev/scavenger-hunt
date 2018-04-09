// routes/hunts.js

const express = require('express');
const router = express.Router();
const getDb = require('../db/index.js');

// TODO: remove when deployed to production, this is for debugging only !!
router.get('/list', (req, res) => {
  process.stdout.write("Connecting to Mongo ...\n");
  getDb().then(db => {
    process.stdout.write("Connected\n");
    db.collection('hunts').find(req.params.id).toArray((err, docs) => {
  		if(err){
  			throw err;
  		}
      process.stdout.write("200: returning 'hunts' collection to /list\n");
      res.status(200).json(docs);
  	});
  }).catch(e => res.status(500).json(e));
});

router.put('/:id', (req, res) => {
  if(!req.body.email || !req.params.id){
    res.status(403).send('Invalid information.');
  }
  process.stdout.write("Connecting to Mongo ...\n");
  getDb().then(db => {
    process.stdout.write("Connected to Mongo\n");
    db.collection('hunts')
    .findOneAndUpdate({id: req.params.id},{
      $push: {
        email: req.body.email
      }
    }, {
      upsert: true
    }, (err, result) => {
      if(err){
        throw err;
      }
      process.stdout.write("200: added " + req.body.email + " to 'hunts' id:" + req.params.id + "\n");
      res.status(200);
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
