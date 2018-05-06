// routes/hunts.js
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const getDb = require('../db');
const logger = require('../../logger');


// TODO: remove when deployed to production, this is for debugging only !!
router.get('/list', (req, res) => {
  logger.info("Connecting to Mongo ...");
  getDb().then(db => {
    logger.info("Connected");
    db.collection('hunts').find(req.params.id).toArray((err, docs) => {
      if (err) {
        return res.status(500).json(err)
      }
      logger.info("200: returning 'hunts' collection to /list");
      res.status(200).json(docs);
    });
  }).catch(e => res.status(500).json(e));
});

router.get('/', (req, res) => {
  getDb().then(db => {
    db.collection('hunts')
      .find({})
      .toArray((err, results) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(results);
        }
      });
  }).catch(e => res.status(500).json(e));
});

router.post('/', (req, res) => {
  // test if hunt request is missing any information
  // requires name, lat, long, radius and items
  const body = req.body;
  const missing = [];

  // Check for and filter out any keys with false values
  // Record those keys with missing or invalid values for later use
  if (!parseFloat(body.lat))
    missing.push("lat");
  // lat and long must be positive or negative floats
  if (!parseFloat(body.long))
    missing.push("long");
  // items array must a non-empty array
  if (!Array.isArray(body.items) || body.items.length < 1)
    missing.push("items");
  // radius must be a float that is greater than 0
  if (!parseFloat(body.radius) || body.radius < 0)
    missing.push("radius");
  // name must be a non-empty string
  if (typeof body.name !== "string" || body.name.length < 1)
    missing.push("name");

  // If any key-value is missing or invalid send a 401 status and
  // message object that tells the caller what is Missing
  // Otherwise send a 200 status with JSON object
  if (missing.length > 0) {
    return res.status(401).send({
      "message": "Missing " + missing.join(',')
    });
  }

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
  if (!req.body.email || !req.params.id) {
    return res.status(403).json({
      message: "Invalid information."
    });

  }
  logger.info("Connecting to Mongo ...");
  getDb().then(db => {
    logger.info("Connected to Mongo");
    db.collection('hunts')
      .findOneAndUpdate({
        id: req.params.id
      }, {
        $push: {
          currentUsers: req.body.email
        }
      }, {
        upsert: true
      }, (err, result) => {
        if (err) {
          return res.status(500).json(err)
        }
        logger.info("200: added " + req.body.email + " to 'hunts' id:" + req.params.id);
        res.status(200).json({
          message: "Added user to hunt"
        });
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
      "items": [{
        "label": "Fountain",
        "lat": 42.12323,
        "long": -79.33171,
        "radius": 1,
        "items": [{
          "label": "Foutain",
          "lat": 42.12323,
          "long": -79.33171
        }]
      }]
    });
  }
});

router.get('/:id', (req, res) => {
  var hunt = db.collection('hunts')
    .findOne({
      "_id": ObjectId(req.params.id)
    });
  res.json(hunt);
});

module.exports = router;
