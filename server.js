'use strict';

var express = require('express');

var port = process.env.PORT || 3000;
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// expose public folders
app.use('/resources', express.static(__dirname + '/client/dist'));
app.use('/images', express.static(__dirname + '/client/images'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// No other middlware handled the request, send a 404
app.use(function (req, res) {
  res.sendStatus(404);
});

app.listen(port, function () {
  console.log('>> running on port ' + port);
});
