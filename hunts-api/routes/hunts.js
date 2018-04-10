// routes/hunts.js

const express = require('express');
const router = express.Router();


router.post('/', (req,res) => {
    res.json({
        "lat": 42.440058,
        "long":  -79.331710,
        "radius": 1,
        "items": [{
        "label": "Park Fountain",
        "lat": 42.440476,
        "long": 79.331665
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

module.exports = router;
