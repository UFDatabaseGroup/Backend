const express = require('express');
const database = require('../database');
const log = require('../logger');

let router = express.Router();

// GET First Trend Query
router.get('/1', async (req, res) => {
  let country;
  let startTime;
  let endTime;
  if (typeof req.query.country !== 'string') {
    return res.status(400).send({
      status: 'error',
      error: 'required paremeter "country" invalid or not provided',
      // fun fact: JSON.stringify deletes undefined entirely
      value: req.query.country
    });
  } else {
    country = req.query.country;
  }
  // i am dumb
  if (!req.query.start_time || Number.isNaN(+req.query.start_time)) {
    return res.status(400).send({
      status: 'error',
      error: 'required paremeter "start_time" invalid or not provided',
      value: req.query.start_time
    });
  } else {
    startTime = +req.query.start_time;
  }
  if (!req.query.end_time || Number.isNaN(+req.query.end_time)) {
    return res.status(400).send({
      status: 'error',
      error: 'required paremeter "end_time" invalid or not provided',
      value: req.query.end_time
    });
  } else {
    endTime = +req.query.end_time;
  }

  log.info('trend query 1, country=%s, start_time=%d, end_time=%d', country, startTime, endTime);
  let result = await database.trendQuery1(country, startTime, endTime);
  // log.debug('trend query 1 return object', { status: 'ok', columns: result.metaData, data: result.rows })
  res.send({ status: 'ok', columns: result.metaData, data: result.rows });
});

// GET Second Trend Query
router.get('/2', async (req, res) => {
  let country;
  if (typeof req.query.country !== 'string') {
    return res.status(400).send({
      status: 'error',
      error: 'required paremeter "country" invalid or not provided',
      value: req.query.country
    });
  } else {
    country = req.query.country;
  }
  log.info('trend query 2, country=%s', country);
  let result = await database.trendQuery2(country);
  res.send({ status: 'ok', columns: result.metaData, data: result.rows });
});

// GET Third Trend Query
router.get('/3', async (req, res) => {
  let country;
  if (typeof req.query.country !== 'string') {
    return res.status(400).send({
      status: 'error',
      error: 'required paremeter "country" invalid or not provided',
      value: req.query.country
    });
  } else {
    country = req.query.country;
  }
  log.info('trend query 3, country=%s', country);
  let result = await database.trendQuery3(country);
  res.send({ status: 'ok', columns: result.metaData, data: result.rows });
});

// GET Fourth Trend Query
router.get('/4', async (req, res) => {
  let country;
  if (typeof req.query.country !== 'string') {
    return res.status(400).send({
      status: 'error',
      error: 'required paremeter "country" invalid or not provided',
      value: req.query.country
    });
  } else {
    country = req.query.country;
  }
  log.info('trend query 4, country=%s', country);
  let result = await database.trendQuery4(country);
  res.send({ status: 'ok', columns: result.metaData, data: result.rows });
});

// GET Fifth Trend Query
// note: the "derp rate" is obtained by dividing the proportion of people who
// die to the disease (case fatality rate) by the current active cases.
// It is based on the idea that more cases would result in overcapacity
// hospitals and thus more deaths to COVID. If this is the case, the plotted
// line should remain relatively horizontal. This query has a high likelihood
// of completely not working, however. 
router.get('/5', async (_req, res) => {
  let result = await database.trendQuery5();
  res.send({ status: 'ok', columns: result.metaData, data: result.rows });
});


module.exports = router;
