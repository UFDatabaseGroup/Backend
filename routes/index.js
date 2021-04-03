var express = require('express');
var router = express.Router();

const db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(`<h1>${db.TrendQuery1()}</h1>`);
});

module.exports = router;
