const express = require('express');
const router = express.Router();
var idnum=1;

router.post('/', (req,res) => {

    res.json({id: idnum, status: 'pending'})
    idnum++;
});

module.exports = router;
