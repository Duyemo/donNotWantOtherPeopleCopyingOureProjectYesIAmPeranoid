//var testScreenSize = function (){
var mql = window.matchMedia('(min-width: 1470px)'); //min width is absolute position of opponent table + it's width
//var heightCheck = window.matchMedia('(min-height: 595px)');//min height is the absolute bposition of opponent table+ it's height. with this to requirmnts the game is 100%playable. although some thing will fal of screen
//var sizeCheck= true;

function screenTestWidth(e) {
  if (e.matches) {console.log("size is fine");}
  else {console.log("problem");}
}
mql.addListener(screenTestWidth);

/*
function screenTestHeight(e){
  if(e.matches) {console.log("hight is ok");}
  else{sizeCheck = false;}
}
heightCheck.addListener(screenTestHeight);


if(sizeCheck === false){
    window.alert("Screensize is to small!!! \nYour sceensize should be at least 1470x959px");
}*/

//}
//$(document).ready(testScreenSize);