// routes/hunts.js

const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const getDb = require('../db');

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

router.post('/', (req,res) => {
  getDb().then(db => {

    // db is available here just like in:
    // http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/#insert-a-document
    const collection = db.collection('hunts');
      // Insert some documents
      collection.insertMany([
        req.body
      ], function(err, result) {
      if (err) return res.status(500).json(err);

      res.json(result);
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

router.get('/:id', (req,res) =>{
  var hunt = db.collection('hunts')
  .findOne({
    "_id": ObjectId(req.params.id)
  });
  res.json(hunt);
});

module.exports = router;
