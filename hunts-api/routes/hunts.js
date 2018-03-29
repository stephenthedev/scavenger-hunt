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

module.exports = router;
