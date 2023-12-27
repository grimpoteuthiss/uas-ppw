/* This JS is inspired by a pen by Jeremy: https://codepen.io/J-Roel/pen/wWGNQN */

function calculateRotation(element, offset) {
    var x = element.offset().left + element.width() / 2;
    var y = element.offset().top + element.height() / 2;
    var rad = Math.atan2(event.pageX - x, event.pageY - y);
    var rot = rad * (180 / Math.PI) * -1 + (230 + offset);
    
    element.css({
      "-webkit-transform": "rotate(" + rot + "deg)",
      "-moz-transform": "rotate(" + rot + "deg)",
      "-ms-transform": "rotate(" + rot + "deg)",
      transform: "rotate(" + rot + "deg)"
    });
  }
  
  $(".tracking-section").mousemove(function(event) {
    var eye = $(".trex-eye");
    var armBack = $(".trex-arm-back");
    var armFront = $(".trex-arm-front");
  
    calculateRotation(eye, 0);
    calculateRotation(armBack, 0);
    calculateRotation(armFront, 15);
  });
  