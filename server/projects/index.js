'use strict';

var express = require('express');
var projects = require('../../projects.json').data;

var app = module.exports = express();
var router = express.Router();

app.set('views', __dirname);
app.use('/projects', router);

router.get('/:projectTitle', function (req, res, next) {
  var projectTitle = req.params.projectTitle;
  projectTitle = decodeURIComponent(projectTitle);

  var projectFound = false;
  projects.forEach(function (project) {
    if (projectTitle === project.title) {
      res.render('project', {
        appStyles: [
          'projects.css'
        ],
        project: project
      });

      projectFound = true;
    }
  });

  if (!projectFound) {
    next();
  }
});
