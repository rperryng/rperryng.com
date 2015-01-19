'use strict';

var express = require('express');
var projects = require('../../projects.json').data;
var colorUtils = require('../common/colorUtils.js');

var app = module.exports = express();
var router = express.Router();

app.set('views', __dirname);
app.use('/', router);

router.get('/', function (req, res) {
  var usedColors = [];

  projects.forEach(function (project) {
    var randomColor = colorUtils.getRandomColorValue();
    while (usedColors.indexOf(randomColor) != -1) {
      randomColor = colorUtils.getRandomColorValue();
    }
    usedColors.push(randomColor);

    // Assign the project a random background color
    var colorName = colorUtils.getNameForColor(randomColor);
    project.link = encodeURIComponent(project.title) + '?backgroundColor=' + colorName;
    project.backgroundColor = randomColor;
  });

  res.render('home', {
    appScripts: [
      'home.min.js'
    ],
    appStyles: [
      'home.min.css'
    ],
    projects: projects
  });
});
