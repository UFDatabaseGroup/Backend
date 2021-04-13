var express = require('express');
var router = express.Router();

const db = require('../database');

/* GET home page. */
router.get('/', function(req, res) {
  // res.send(`<h1>${db.trendQuery1()}</h1>`);
  res.send({
    status: 'ok'
  });
});

module.exports = router;
