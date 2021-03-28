var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("Received Login Request");
});

module.exports = router;
