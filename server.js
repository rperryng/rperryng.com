'use strict';

var express = require('express'),
  exphbs = require('express-handlebars');

var port = process.env.PORT || 3000;
var app = express();

// setup handlebars for view templating
var hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: './views',
});
app.engine('hbs', hbs.engine);
app.set('views', './views');
app.set('view engine', 'hbs');

// expose public folders
app.use('/resources', express.static(__dirname + '/client/dist'));
app.use('/images', express.static(__dirname + '/client/images'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/resume', function (req, res) {
  res.sendFile(__dirname + '/client/Resume.pdf');
});

// use custom routing middleware
app.use(require('./server/home'));
app.use(require('./server/projects'));

// No other middlware handled the request, send a 404
app.use(function (req, res) {
  res.sendStatus(404);
});

app.listen(port, function () {
  console.log('>> running on port ' + port);
});
