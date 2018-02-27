// routes/version.js
const router = require('express').Router();

const packagejson = require('../package.json');

router.get('/', (req, res) => {
  res.json({
    name: packagejson.name,
    version: packagejson.version,
    description: packagejson.description
  });
});

module.exports = router;
