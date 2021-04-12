const express = require('express');
const router = express.Router();

router.post('/login', function(req, res, next) {
    console.log("Received Login Request");
    res.send({
        token: '123'
    });
});

router.post('/register', function(req, res, next) {
    console.log("Received Register Request");
});
module.exports = router;
