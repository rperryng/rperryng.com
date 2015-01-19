'use strict';

var colors = {
  valencia:       'D64541',
  wax:            'F1A9A0',
  honeyFlower:    '674172',
  sanMarino:      '446CB3',
  ming:           '336E7B',
  ebonyClay:      '336E7B',
  chambray:       '3A539B',
  silverTree:     '68C3A3',
  freeSpeechAqua: '03A678',
  jaffa:          'EB974E',
  lynch:          '6C7A89'
};

var colorValues = [];
for (var colorName in colors) {
  colorValues.push(colors[colorName]);
}

module.exports = {
  getColors: getColors(),
  getNameForColor: getNameForColor,
  getRandomColorValue: getRandomColorValue
};

//////////

function getColors() {
  return colors;
}

function getColorValues() {
  return Object.keys(colors).map(function (colorName) {
    return colors[colorName];
  });
}

function getRandomColorValue () {
  return colorValues[Math.floor(Math.random() * colorValues.length)];
}

function getNameForColor(colorValue) {

  // Default to valencia if not found
  var colorName = 'valencia';
  var allColorNames = Object.keys(colors);

  for (var i = 0; i < allColorNames.length; i++) {
    var currentColorName = allColorNames[i];

    if (colors[currentColorName] == colorValue) {
      colorName = currentColorName;
    }
  }

  return colorName;
}
