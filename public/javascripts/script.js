var gameStatus = 0;

colorChange();

// changes the game state
// 0 is before the game
// 1 is when playing
function gameState() {

    if (gameStatus == 0) {
        alert("was 0");
        gameStatus = 1;
        return;
    }
    if (gameStatus == 1) {
        alert("was 1");
        gameStatus = 0;
        return;
    }
}

function fire(elem) {
    var shipStat = 0;
    // if there is a ship it will be a hit, otherwise it will be a miss
    if (shipStat == 1) {
        hit();
        elem.style.backgroundColor = "#00FF00";

    } else {
        mis();
        elem.style.backgroundColor = "tomato";

    }

}

function hit() {
    // change image
    document.images["hit"].src = "images/hit.gif";

    //document.images["hit"].src = "images/stillhit.png";


}

function mis() {
    // change image
    document.images["mis"].src = "images/mis.gif";

}

function colorChange(){
    document.getElementById("titel").style.color = "#87d0fe";
}

/*
//Player's ships interraction
var ship1 = document.getElementById("ship1");
var ship2 = document.getElementById("ship2");
var ship3 = document.getElementById("ship3");

var doubleShip1 = document.getElementById("doubleShip1");
// var doubleShip2 = document.getElementById("doubelShip2");

var moving = false;
var movingDouble = false; 
var sizeOfShip = 0;  
var oneForOne = false;

ship1.addEventListener("mousedown", initialClick, false);
ship2.addEventListener("mousedown", initialClick, false);
ship3.addEventListener("mousedown", initialClick, false);

doubleShip1.addEventListener("mousedown", initialClick, false);
doubleShip2.addEventListener("mousedown", initialClick, false);

var shipRemove = null; 
var tablePlayer = document.getElementById("playerTable");
var rowClicked = null;
var collomClicked = null;

//ships.addEventListener("mousedown", addShip(1,1), false);



function move(e){
var newX = e.clientX - 10;
var newY = e.clientY - 10;

image.style.left = newX + "px";
image.style.top = newY + "px";
}


function initialClick(e) {
   if(moving){
     document.removeEventListener("mousemove", move);
     moving = !moving;
     return;
   }
   moving = !moving;
   image = this;
   shipPlace=this; 
   //window.alert(shipRemove.height);
   sizeOfShip = shipPlace.height;
   document.addEventListener("mousemove", move, false);
 }
 

 //function for determening on witch field in the table is clicked
 $(document).ready(function(){
   $("#playerTable th").click(function() {     

      collomClicked = parseInt( $(this).index() );
      rowClicked = parseInt( $(this).parent().index() )+1;    
      //window.alert( "RowClicked =" + rowClicked + "  ,  CollomClicked ="+ collomClicked );
      
      var row = document.getElementById("playerTable").rows[rowClicked];
      var cell = row.cells[collomClicked];

          //if((document.getElementById("playerTable").rows[rowClicked].cells[collomClicked].id !="contains")){
            if(sizeOfShip===35){addShipSingle(rowClicked, collomClicked);}
            if(sizeOfShip===70)addShipDouble(rowClicked, collomClicked);
          
          

          
               
   });
});


function addShipSingle(rowNumber, cellNumber){  
  if(rowNumber>=1 && cellNumber>=1 && shipPlace != null){
  if(moving){
    var row = document.getElementById("playerTable").rows[rowNumber];
    var cell = row.cells[cellNumber];
    var img = document.createElement('img');
     
    if(cell.id != "contains"){
    img.src = shipPlace.src;
    cell.appendChild(img);
    cell.id = "contains";
    
    (shipPlace).remove();
    shipPlace = null; 
  }
  }
  }
}


function addShipDouble(rowNumber, cellNumber)
 {
   if(rowNumber>=1 && cellNumber>=1 && shipPlace != null){
   if(moving){
     var row = document.getElementById("playerTable").rows[rowNumber];
     var cell = row.cells[cellNumber];
     var img = document.createElement('img');
    
     if(cell.id != "contains" && ((document.getElementById("playerTable").rows[rowNumber-1].cells[cellNumber].id !="contains")||(document.getElementById("playerTable").rows[rowNumber+1].cells[cellNumber].id !="contains" ) )){
     img.src = "images/doubleShipBot.gif";
     cell.appendChild(img);
     cell.id = "contains";
     
    //window.alert(document.getElementById("playerTable").rows[rowNumber+1].cells[cellNumber].id);
    
    if(rowNumber-1 >=1 && document.getElementById("playerTable").rows[rowNumber-1].cells[cellNumber].id !="contains"){ var row = document.getElementById("playerTable").rows[rowNumber-1]; }
     else{var row = document.getElementById("playerTable").rows[rowNumber+1];}
     var cell = row.cells[cellNumber];
     var img = document.createElement('img');
    
     
     img.src = "images/doubleShipTop.gif";
     cell.appendChild(img);
     cell.id = "contains";

     (shipPlace).remove();
     shipPlace = null; 
     
    }
   }
}
 } */