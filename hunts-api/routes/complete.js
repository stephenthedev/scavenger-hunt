// complete.js

const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const getDb = require('../db');
const router = express.Router();

const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition({region: 'us-east-1'});


router.post('/', (req,res) => {

    if(req.body.id && req.body.label && req.body.image && req.body.email) {
      // Check that its right
      getDb().then(db => {
        console.log('Finding the hunt');
        let collection = db.collection('hunts');
        collection.findOne(
          {_id: ObjectId(req.body.id)},
          (err, hunt) => {
            console.log('Found the hunt');

            if(err) return res.status(500).json(err);
            if(hunt == null) return res.status(404).json({message: ' Cant find that hunt '});

            let item = hunt.items.find(i => i.label == req.body.label);
            if(item) {
              // Match it against computer vision
              const params = {
                Image: {
                  Bytes: Buffer.from(req.body.image, 'base64')
                },
                MaxLabels: 10,
                MinConfidence: 90
              };
              console.log('Checking the item');
              rekognition.detectLabels(params, (err, result) => {
                if (err) {
                  res.status(500).json(err);
                } else {
                  // Check if the label exists in the result
                  let found = result.Labels.find(label => label.Name.toLowerCase() == req.body.label.toLowerCase());
                  // Update the hunts item with the user who has completed it
                  if (found) {
                    console.log('Found the item');
                    // do the update
                    item.usersWhoHaveCompletedIt.push(req.body.email);
                    collection.findOneAndUpdate(
                      {_id: ObjectId(req.body.id)},
                      hunt,
                      (err) => err ? res.status(500).json(err) : res.json({message: 'MATCHED'})
                    );

                  } else {
                    // don't
                    console.log(result);
                    res.json({message: 'NOT A MATCH'});
                  }
                }
              });
            } else {
              res.status(404).json({message: 'Could not find that item'});
            }
          }
        );
      }).catch(e => {
        console.error(e);
        res.status(500).json(e)
      });
    } else {
      res.status(400).json({message:"You need to include id, label, image"});
    }



    // if((req.body.id == 'abcd-efgh-ijkl-mnop') && (req.body.image == 'base64String')){
    //   res.status(200).json({
    //     "status" : "SUCCESS"
    //   });
    // }
    // else if (!req.body.id) {
    //   res.status(401).json({
    //     "status" : "FAILURE",
    //     "message": "Missing id"
    //   });
    // }
    // else if (!req.body.image) {
    //   res.status(401).json({
    //     "status" : "FAILURE",
    //     "message": "Missing image"
    //   });
    // }
    
});

module.exports = router;
