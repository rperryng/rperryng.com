'use strict';

var express = require('express');
var projects = require('../../projects.json').data;

var app = module.exports = express();
var router = express.Router();

app.set('views', __dirname);
app.use('/', router);

router.get('/', function (req, res) {

  projects.forEach(function (project) {
    project.link = encodeURIComponent(project.title);
  });

  res.render('home', {
    appScripts: [
      'home.js'
    ],
    appStyles: [
      'home.css'
    ],
    projects: projects
  });
});
