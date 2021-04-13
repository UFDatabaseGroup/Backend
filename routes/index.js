var express = require('express');
var router = express.Router();

const db = require('../database');

/* GET home page. */
router.get('/', async (req, res) => {
  // res.send(`<h1>${db.trendQuery1()}</h1>`);
  await db.readyState;
  res.send({
    status: 'ok',
    totalRowCount: await db.getTotalRowCount()
  });
});

module.exports = router;
