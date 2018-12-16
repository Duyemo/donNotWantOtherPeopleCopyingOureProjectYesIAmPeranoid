var testScreenSize = function (){
var mql = window.matchMedia('(min-width: 1470px, min-height: 595px)'); //min width is absolute position of opponent table + it's width
//min height is the absolute bposition of opponent table+ it's height. with this to requirmnts the game is 100%playable. although some thing will fal of screen

function screenTest(e) {
  if (e.matches) {}
  else {window.alert("screensize is to small! \n Your sceensize should be at least 1470x959px")}
  mql.addListener(screenTest);
}
}
$(document).ready(testScreenSize);