const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const indexRouter = require('./routes/index');
const TrendQueriesRouter = require('./routes/trend-queries');
const AuthRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//.use(cookieParser());
app.use(cors());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/trend-queries', TrendQueriesRouter);
app.use('/auth', AuthRouter);

module.exports = app;
