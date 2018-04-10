// routes/hunts.js

const express = require('express');
const router = express.Router();


router.post('/', (req,res) => {
    res.json({
        name: 'Hunt 1'
    });
});

router.post('/hunts', (req, res) => {
    // test if hunt request is missing any information
    // requires name, lat, long, radius and items
    const body = req.body;
    const missing = [];

    // Check for and filter out any keys with false values
    // Record those keys with missing or invalid values for later use
    if(!parseFloat(body.lat))
      missing.push("lat");
    // lat and long must be positive or negative floats
    if(!parseFloat(body.long))
      missing.push("long");
    // items array must a non-empty array
    if(!Array.isArray(body.items) || body.items.length < 1)
      missing.push("items");
    // radius must be a float that is greater than 0
    if(!parseFloat(body.radius) || body.radius < 0)
      missing.push("radius");
    // name must be a non-empty string
    if(typeof body.name !== "string" || body.name.length < 1)
      missing.push("name");

    // If any key-value is missing or invalid send a 401 status and
    // message object that tells the caller what is Missing
    // Otherwise send a 200 status with JSON object
    if(missing.length > 0) {
      res.status(401).send({"message": "Missing " + missing.join(',')});
    } else {
      res.status(200).json({
          "id":"abcd-efgh-ijkl-mnop",
          "name": "Some Hunt",
          "lat": 42.12323,
          "long": -79.33171,
          "radius": 1,
          "items": [
            {
              "label": "Foutain",
              "lat": 42.12323,
              "long": -79.33171
            }
          ]
        });
    }
});
module.exports = router;
