'use strict';

var express = require('express');

var app = module.exports = express();
var router = express.Router();
app.use('/', router);

app.set('views', __dirname);
app.set('view engine', 'jade');

router.get('/', function (req, res, next) {
  res.render('home', {
    styles: ['home']
  });
});
