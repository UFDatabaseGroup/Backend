var express = require('express');
var router = express.Router();

// GET First Trend Query
router.get('/1', function(req, res, next) {
    res.send('First Trend Query');
});

// GET Second Trend Query
router.get('/2', function(req, res, next) {
    res.send('Second Trend Query');
});

// GET Third Trend Query
router.get('/3', function(req, res, next) {
    res.send('Third Trend Query');
});

// GET Fourth Trend Query
router.get('/4', function(req, res, next) {
    res.send('Fourth Trend Query');
});

// GET Fifth Trend Query
router.get('/5', function(req, res, next) {
    res.send('Fifth Trend Query');
});


module.exports = router;
