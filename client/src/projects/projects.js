(function () {
  'use strict';

  window.onload = window.onresize = function () {
    var element = document.getElementById('project-image');
    var width = element.clientWidth;
    var height = element.clientHeight;

    if (width > height) {
      element.style.width = '100%';
    } else {
      element.style.height = (window.innerHeight / 1.5) + 'px';
    }
  };
})();
    
