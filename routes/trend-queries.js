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
  let startTime;
  let endTime;
  if (typeof req.query.country !== 'string') {
    return res.status(400).send({
      status: 'error',
      error: 'required paremeter "country" invalid or not provided',
      value: req.query.country
    });
  } else {
    country = req.query.country;
  }
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
  log.info('trend query 2, country=%s, start_time=%d, end_time=%d', country, startTime, endTime);
  let result = await database.trendQuery2(country, startTime, endTime);
  res.send({ status: 'ok', columns: result.metaData, data: result.rows });
});

// GET Third Trend Query
router.get('/3', async (req, res) => {
  let country;
  let startTime;
  let endTime;
  if (typeof req.query.country !== 'string') {
    return res.status(400).send({
      status: 'error',
      error: 'required paremeter "country" invalid or not provided',
      value: req.query.country
    });
  } else {
    country = req.query.country;
  }
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
  log.info('trend query 3, country=%s, start_time=%d, end_time=%d', country, startTime, endTime);
  let result = await database.trendQuery3(country, startTime, endTime);
  res.send({ status: 'ok', columns: result.metaData, data: result.rows });
});

// GET Fourth Trend Query
router.get('/4', async (req, res) => {
  let country;
  let startTime;
  let endTime;
  if (typeof req.query.country !== 'string') {
    return res.status(400).send({
      status: 'error',
      error: 'required paremeter "country" invalid or not provided',
      value: req.query.country
    });
  } else {
    country = req.query.country;
  }
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
  log.info('trend query 4, country=%s, start_time=%d, end_time=%d', country, startTime, endTime);
  let result = await database.trendQuery4(country, startTime, endTime);
  res.send({ status: 'ok', columns: result.metaData, data: result.rows });
});

// GET Fifth Trend Query
router.get('/5', async (req, res) => {
  let startTime;
  let endTime;
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
  log.info('trend query 5, start_time=%d, end_time=%d', startTime, endTime);
  let result = await database.trendQuery5(startTime, endTime);
  res.send({ status: 'ok', columns: result.metaData, data: result.rows });
});

router.get('/6', async (req, res) => {
  let country;
  let startTime;
  let endTime;
  if (typeof req.query.country !== 'string') {
    return res.status(400).send({
      status: 'error',
      error: 'required paremeter "country" invalid or not provided',
      value: req.query.country
    });
  } else {
    country = req.query.country;
  }
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
  log.info('trend query 6, country=%s, start_time=%d, end_time=%d', country, startTime, endTime);
  let result = await database.trendQuery6(country, startTime, endTime);
  res.send({ status: 'ok', columns: result.metaData, data: result.rows });
});


module.exports = router;
