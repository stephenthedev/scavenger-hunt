// complete-item.js
const express = require('express');
const router = express.Router();

const getDb = require('/db');
const ObjectId = require('mongodb').ObjectId;

// Acceptance Criteria:
// Update the hunts-api/complete-item route to take a supplied users email
// and add it the usersSubmitted field of the item
//
// Approach:
// Use mongo to find by the ObjectID, add the email to the specified item,
// and update the object in mongo

router.post('/complete-item', (req, res) => {
    // connect to DB
    getDb().then(db => {
      const collection = db.collection('hunts');
      // find item by ObjectID
      collection.findOneAndUpdate({
        "_id": ObjectID(req.params.id)},
        // push user's email to usersSubmitted field
        {
          $push: {usersSubmitted: req.body.email}
        },
        {
          upsert: true
        },
        // if unsuccessful, return error, otherwise success
        err => {
          if (err) {
            return res.status(500).json(err);
          }
          res.status(200).json(
            {
              message: "User email added"
            }
          );
        })
        // catch any exceptions thrown during execution
    }).catch(e => res.status(500).json(e));
});
