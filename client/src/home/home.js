// set background colors for projects
(function () {
  'use strict';

  // http://www.flatuicolorpicker.com/all
  var colors = {
    valencia:       "#D64541",
    wax:            "#F1A9A0",
    honeyFlower:    "#674172",
    sanMarino:      "#446CB3",
    ming:           "#336E7B",
    ebonyClay:      "#336E7B",
    chambray:       "#3A539B",
    silverTree:     "#68C3A3",
    freeSpeechAqua: "#03A678",
    jaffa:          "#EB974E",
    lynch:          "#6C7A89"
  };

  var allColors = [];
  for (var color in colors) {
    allColors.push(colors[color]);
  }

  function getRandomColor () {
    return allColors[Math.floor(Math.random() * allColors.length)];
  }

  var pickedColors = [];
  var projects = document.getElementsByClassName('project-item');

  Array.prototype.forEach.call(projects, function (project) {
    var randomColor = getRandomColor();
    while (pickedColors.indexOf(randomColor) != -1) {
      randomColor = getRandomColor();
    }
    pickedColors.push(randomColor);

    project.style.backgroundColor = randomColor;
  });
})();

window.onload = window.onresize = function () {
  bannerSize = (window.innerHeight < 400) ? '400px' : window.innerHeight + 'px';
  document.getElementById('banner').style.height = bannerSize;
};
