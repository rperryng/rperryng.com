'use strict';

var express = require('express');
var env     = require('node-env-file');
var morgan  = require('morgan');
var logger  = require('logger');

env(__dirname + '/.env');

// Application setup
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + './server/views');

// Request logging
app.use(morgan('dev', {stream: logger.morganStream}));

// Routes
app.use(require('./server/home'));

// 404 Handling
app.use(function (req, res, next) {
  res.sendStatus(404);
});

// Error handling
app.use(function (req, res, next, err) {
  logger.error(err.stack);
  res.status(500).json({
    error: 'Internal server error'
  });
});

app.listen(process.env.PORT);
logger.info('listening on port %d', process.env.PORT);
