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

// Static assets
app.use('/client', express.static(__dirname + '/client/dist'));
app.use('/fonts', express.static(__dirname + '/client/resources/fonts'));
app.use('/images', express.static(__dirname + '/client/resources/images'));
app.use('/bower', express.static(__dirname + '/bower_components'));

// Routes
app.use(require('./server/home'));

// 404 Handling
app.use(function (req, res, next) {
  res.sendStatus(404);
});

// Error logging
app.use(function (err, req, res, next) {
  logger.error(err.stack);
  next(err);
});

app.listen(process.env.PORT);
logger.info('listening on port %d', process.env.PORT);
