var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
    console.log("Received Login Request");
});

router.post('/register', function(req, res, next) {
    console.log("Received Register Request");
});
module.exports = router;
