// routes/hunts.js

const express = require('express');
const router = express.Router();
const getDb = require('../db/index.js');

router.put('/:id', (req, res) => {
  if(!req.body.email || !req.params.id){
    res.status(403).send('Invalid information.');
  }
  console.log('User', req.body.email, 'wants to join hunt ID', req.params.id);

  getDb().then(db => {
    console.log('db connected');

    db.listCollections();
    let collections = db.listCollections();
    console.log('Collections: %j', collections);

    db.collection('hunts').find(req.params.id).toArray((err, docs) => {
      console.log('here');
  		if(err){
  			throw err;
  		}
  		console.log('Documents are ', docs);
      res.status(200).send('got em');

  	});

    db.close();

  }).catch(e => res.status(500).json(e));

});

module.exports = router;
