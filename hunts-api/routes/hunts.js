// routes/hunts.js

const express = require('express');
const server = express();
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;


router.post('/', (req,res) => {
    res.json({
        name: 'Hunt 1'
    });
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

server.get('/:id', (req,res) =>{
  var hunt = db.collection('hunts')
  .findOne({
    "_id": ObjectId(req.params.id)
  });
  res.json(hunt);
});

module.exports = router;
