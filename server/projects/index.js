'use strict';

var express = require('express');
var projects = require('../../projects.json').data;
var colorUtils = require('../common/colorUtils.js');

var app = module.exports = express();
var router = express.Router();

app.set('views', __dirname);
app.use('/projects', router);

router.get('/:projectTitle', function (req, res, next) {
  var projectTitle = req.params.projectTitle;
  var backgroundColor = req.query.backgroundColor;
  backgroundColor = colorUtils.getColors[backgroundColor] || colorUtils.getRandomColorValue();

  projectTitle = decodeURIComponent(projectTitle);

  // Find the project details by matching the title with the one in the projects.json
  var projectFound = false;
  projects.forEach(function (project) {
    if (projectTitle === project.title) {
      res.render('project', {
        appStyles: [
          'projects.min.css'
        ],
        appScripts: [
          'projects.min.js'
        ],
        project: project,
        backgroundColor: backgroundColor
      });

      projectFound = true;
    }
  });

  if (!projectFound) {
    next();
  }
});
