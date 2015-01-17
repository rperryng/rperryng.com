'use strict';

var express = require('express');
var projects = require('../../projects.json');

var app = module.exports = express();
var router = express.Router();

app.set('views', __dirname + '/views');
app.use('/', router);

router.get('/', function (req, res) {
  res.render('home', {
    appScripts: [
      'home.js'
    ],
    appStyles: [
      'home.css'
    ],
    projects: projects.data
  });
});
