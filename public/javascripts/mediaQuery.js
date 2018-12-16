var testScreenSize = function (){

var widthCheck = window.matchMedia("(min-width: 1470px)"); //min width is absolute position of opponent table + it's width
var heightCheck = window.matchMedia("(min-height: 595px)");//min height is the absolute bposition of opponent table+ it's height. with this to requirmnts the game is 100%playable. although some thing will fal of screen
screenTestHeight(heightCheck); //check height when you load the page
screenTestWidth( widthCheck); //check width when you load the page
widthCheck.addListener(screenTestWidth);  //check width when you resize the page
heightCheck.addListener(screenTestHeight);  //check height when you resize the page

//function that checks if the width of the screen is sufficiently large
function screenTestWidth(e) {
  if(e.matches){console.log("width is fine");}
  else {window.alert("The window size is to small!!! \n It should be at least 1470x595px");}
}


//function that checks if the height of the screen is sufficiently large
function screenTestHeight(e){
  if(e.matches){console.log("hight is ok");}
  else{window.alert("The window size is to small!!! \n It should be at least 1470x595px");}
}



};
$(document).ready(testScreenSize);