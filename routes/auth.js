const express = require('express');
const database = require('../database');
const router = express.Router();

router.post('/login', async function(req, res, next) {
    console.log("Received Login Request");
    if ( await database.loginUser(req.query.username, req.query.password)) {
        res.send({
            token: 'true'
        });   
    } else {
        res.send({
            token: 'false'
        });
    }
});

router.post('/register', function(req, res, next) {
    console.log("Received Register Request");
});
module.exports = router;
