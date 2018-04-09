// users-api/users.js
const router = require('express').Router();
const packagejson = require('../package.json');

// respond to get request with users list
router.get('/', (req, res) => {
  res.json({
    "userList": [
      {"id": "1", "name": "Ross"},
      {"id": "2", "name": "Chandler"},
      {"id": "3", "name": "Monica"},
      {"id": "4", "name": "Rachel"},
      {"id": "5", "name": "Phoebe"},
      {"id": "6", "name": "Joey"},
    ]});
});

module.exports = router;
