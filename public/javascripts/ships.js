//js page containing the interactions for the ship, inculding placing them into the table
//variable that says if their is a ship mapped to your mouse
var moving = false;

//variables for the ship that your currently have selected
var heightOfShip =0;  
var widthOfShip =0; 
var oneForOne = false;
var shipRemove = null; 

//function that allows you select a ship and turn it sideways
var registerClickOnShip = function () {
  
  //Get the ship ellements
  var ship1 = document.getElementById("ship1");
  var ship2 = document.getElementById("ship2");
  var doubleShip1 = document.getElementById("doubleShip1");
  var doubleShip2 = document.getElementById("doubleShip2");
  var tripleShip1 = document.getElementById("tripleShip1"); 
  var tripleShip2 = document.getElementById("tripleShip2");
  var quadraShip1 = document.getElementById("quadraShip1");
  var pentaShip1 = document.getElementById("pentaShip1");

  //creats the eventlisteners for the ships
  ship1.addEventListener("mousedown", initialClick, false);
  ship2.addEventListener("mousedown", initialClick, false);
  doubleShip1.addEventListener("mousedown", initialClick, false);
  doubleShip2.addEventListener("mousedown", initialClick, false);
  tripleShip1.addEventListener("mousedown", initialClick, false);
  tripleShip2.addEventListener("mousedown", initialClick, false);
  quadraShip1.addEventListener("mousedown", initialClick, false);
  pentaShip1.addEventListener("mousedown", initialClick, false);

  
  //function that maps the ship thats clicked on to the mouse
  function move(e){
  
  //creats the variables that are equal to the mouse cordinates -10   
  var newX = e.clientX  - 10;
  var newY = e.clientY - 10;
  
  //maps the value of the position of an image object to the mouse
  image.style.left = newX + "px";
  image.style.top = newY + "px";
    }
  

  //function that registers if you click on a ship
  function initialClick(e) {
     
    //if a ship is selected and you click again, it puts the ship down
    if(moving){
       document.removeEventListener("mousemove", move);
       moving = !moving;
       return;
     }

    //if you click on a ship sets the variables with information of the ship to the values of the ship
    moving = !moving;
    image = this;
    shipPlace=this; 
    heightOfShip = shipPlace.height;
    widthOfShip = shipPlace.width; 

    //Maps the ship to the mouse
    document.addEventListener("mousemove", move, false);
   }


   //function that turns the selected ship
    document.addEventListener("keypress", function (event) {
      
      // check if the key that is pressed is indead the spacebar
    if(event.keyCode == 32){ 
    if(moving){
     
      //removes the ship that you currently have selected
      (shipPlace).remove();
      shipPlace = null; 
      
      //this part creates a new ship with the orgiginal ship turned and applies the fitting image to it
      // every if is for an other format of ship
      var shipTurned;
      
      if(heightOfShip == 70){
        shipTurned = new Image(70, 35);
        shipTurned.src = "images/doubleShipTurned.gif";
      }
      if(heightOfShip == 105){
        shipTurned = new Image(105, 35);
        shipTurned.src = "images/tripleShipTurned.gif";
      }
      if(heightOfShip == 140){
        shipTurned = new Image(140, 35);
        shipTurned.src = "images/quadraShipTurned.gif";
      }
      if(heightOfShip == 175){
        shipTurned = new Image(175, 35);
        shipTurned.src = "images/pentaShipTurned.gif";
      }
      if(widthOfShip == 70){
        shipTurned = new Image(35, 70);
        shipTurned.src = "images/doubleShip.gif";
      }
      if(widthOfShip == 105){
        shipTurned = new Image(35, 105);
        shipTurned.src = "images/tripleShip.gif";
      }
      if(widthOfShip == 140){
        shipTurned = new Image(35, 140);
        shipTurned.src = "images/quadraShip.gif";
      }
      if(widthOfShip == 175){
        shipTurned = new Image(35, 175);
        shipTurned.src = "images/pentaShip.gif";
      }
      if(heightOfShip == 35 && widthOfShip == 35){
        shipTurned = new Image(35, 35);
        shipTurned.src = "images/ship1.gif";
      } 


      //set the id and alt for newley turned ship and adds it to the body of the html
      shipTurned.id= "shipTurned";
      shipTurned.alt= "shipTurned";
      document.body.appendChild(shipTurned);
     
      //this part gets the ship ellement and creats the eventlisteners for the ships
      //var shipTurned = document.getElementById("shipTurned");// delete this line later
      shipTurned.addEventListener("mousedown", initialClick, false);
      
      //set all standerd variables of a selected ship to that of the newley turned ship
      image = shipTurned;
      shipPlace = shipTurned; 
      heightOfShip = shipTurned.height; 
      widthOfShip = shipTurned.width;
      
      //maps the newley turned ship to the mouse
      document.addEventListener("mousemove", move, false);
     
    }
  }
 });

};
$(document).ready(registerClickOnShip);


 //function for determening on witch field in the table is clicked
 // and placing the ships
 var placeShipInTable = function () {

    //variables for the table
    var tablePlayer = document.getElementById("playerTable");
    var rowClicked = null;
    var collomClicked = null;

    $("#playerTable th").click(function() {     

        collomClicked = parseInt( $(this).index() );
        rowClicked = parseInt( $(this).parent().index() )+1;    
    
      
        var row = document.getElementById("playerTable").rows[rowClicked];
        var cell = row.cells[collomClicked];

          
        if(heightOfShip === 35 && widthOfShip === 35){addShipSingle(rowClicked, collomClicked);}
        if(heightOfShip === 70 && widthOfShip === 35)addShipDouble(rowClicked, collomClicked);
            
        if(heightOfShip === 105 && widthOfShip === 35)addShipTriple(rowClicked,collomClicked);
        if(heightOfShip === 140 && widthOfShip === 35)addShipQuadra(rowClicked,collomClicked);
        if(heightOfShip === 175 && widthOfShip === 35)addShipPenta(rowClicked,collomClicked);
        if(heightOfShip === 35 && widthOfShip === 70)addShipDoubleTurned(rowClicked,collomClicked);
        if(heightOfShip ===35 && widthOfShip === 105)addShipTripleTurned(rowClicked,collomClicked);
        if(heightOfShip === 35 && widthOfShip === 140)addShipQuadraTurned(rowClicked,collomClicked);
        if(heightOfShip === 35 && widthOfShip === 175)addShipPentaTurned(rowClicked,collomClicked);
        
      });
      

    function generalAdder(rowNumber, cellNumber, imageSrc){
           
        //select the right cell and create an image          
        var row = document.getElementById("playerTable").rows[rowNumber];
        var cell = row.cells[cellNumber];
        var img = document.createElement('img');
        
        //give image the just source-code and place it in the cell. 
        img.src = imageSrc;
        cell.appendChild(img);
        //cell.style.background = " #ffffff src(imageSrc) no-repeat right";
       
        
        //set the id of the cell to "contains" to mark that the cell contains a ship 
        cell.id = "contains";
      }


      //checks if al spaces arround where you want to place the ship are empty
    function isEmptyArround(rowNumber, cellNumber){
       if(rowNumber<10 && cellNumber<10){
        if(document.getElementById("playerTable").rows[rowNumber].cells[cellNumber].id !="contains" &&
          document.getElementById("playerTable").rows[rowNumber+1].cells[cellNumber].id !="contains" &&
          document.getElementById("playerTable").rows[rowNumber-1].cells[cellNumber].id !="contains" &&
          document.getElementById("playerTable").rows[rowNumber].cells[cellNumber+1].id !="contains" &&
          document.getElementById("playerTable").rows[rowNumber].cells[cellNumber-1].id !="contains"){
          return true; }
        else{ return false;}
       }
       
       if(rowNumber==10 && cellNumber<10){
         if(document.getElementById("playerTable").rows[rowNumber].cells[cellNumber].id !="contains" &&
          document.getElementById("playerTable").rows[rowNumber-1].cells[cellNumber].id !="contains" &&
          document.getElementById("playerTable").rows[rowNumber].cells[cellNumber+1].id !="contains" &&
          document.getElementById("playerTable").rows[rowNumber].cells[cellNumber-1].id !="contains"){
          return true; }
       else{ return false;}
       }
       
       if(rowNumber<10 && cellNumber==10){
        if(document.getElementById("playerTable").rows[rowNumber].cells[cellNumber].id !="contains" &&
         document.getElementById("playerTable").rows[rowNumber+1].cells[cellNumber].id !="contains" &&
         document.getElementById("playerTable").rows[rowNumber-1].cells[cellNumber].id !="contains" &&
         document.getElementById("playerTable").rows[rowNumber].cells[cellNumber-1].id !="contains"){
         return true; }
      else{ return false;}
      }
       
      if(rowNumber==10 && cellNumber==10){
        if(document.getElementById("playerTable").rows[rowNumber].cells[cellNumber].id !="contains" &&
         document.getElementById("playerTable").rows[rowNumber-1].cells[cellNumber].id !="contains" &&
         document.getElementById("playerTable").rows[rowNumber].cells[cellNumber-1].id !="contains"){
         return true; }
      else{ return false;}
      }

     }
  
      
    function addShipSingle(rowNumber, cellNumber){  
              
              //checks if their is enough space to place the ship
              if(rowNumber>=1 && cellNumber>=1 && shipPlace != null &&
                isEmptyArround(rowNumber, cellNumber)){
                
                  //checks if you selected a ship
              if(moving){
                
                //add the parts of the ship to the table
                generalAdder(rowNumber, cellNumber, "images/ship1.gif");
              
                //commands that delets the selected ship so you can't re-use it
                (shipPlace).remove();
                shipPlace = null; 
              }
              }
      }
            
            
    function addShipDouble(rowNumber, cellNumber){
             
                //checks if their is enough space to place the ship
              if(rowNumber>=1 && cellNumber>=1 && shipPlace != null &&     
                isEmptyArround(rowNumber, cellNumber) &&
                isEmptyArround(rowNumber+1, cellNumber)){   
              
                  //checks if you selected a ship
              if(moving){                                                                                      
                //add the parts of the ship to the table
                generalAdder(rowNumber, cellNumber, "images/doubleShipTop.gif");
                generalAdder(rowNumber+1, cellNumber, "images/doubleShipBot.gif");
                
                //commands that delets the selected ship so you can't re-use it
                (shipPlace).remove();
                shipPlace = null;  
            }
            }
      }
            
            
    function addShipTriple(rowNumber, cellNumber){  
               //checks if their is enough space to place the ship
              if(rowNumber>=1 && cellNumber>=1 && shipPlace != null &&     
                isEmptyArround(rowNumber, cellNumber) &&
                isEmptyArround(rowNumber+1, cellNumber) &&
                isEmptyArround(rowNumber+2, cellNumber)){   
             
              //checks if you selected a ship
              if(moving){                                                                                      
                
                //add the parts of the ship to the table
                generalAdder(rowNumber, cellNumber, "images/ship1.gif");
                generalAdder(rowNumber+1, cellNumber, "images/ship1.gif");
                generalAdder(rowNumber+2, cellNumber,"images/ship1.gif");
              
              //commands that delets the selected ship so you can't re-use it
              (shipPlace).remove();
              shipPlace = null;  
            }
            }
      }
            
            
    function addShipQuadra(rowNumber, cellNumber){  
             
              //checks if their is enough space to place the ship
              if(rowNumber>=1 && cellNumber>=1 && shipPlace != null &&     
                isEmptyArround(rowNumber, cellNumber) &&
                isEmptyArround(rowNumber+1, cellNumber) &&
                isEmptyArround(rowNumber+2, cellNumber) &&
                isEmptyArround(rowNumber+3, cellNumber)){   
            
              //checks if you selected a ship
              if(moving){                                                                                      
               
               //add the parts of the ship to the table
               generalAdder(rowNumber, cellNumber, "images/ship1.gif");
               generalAdder(rowNumber+1, cellNumber, "images/ship1.gif");
               generalAdder(rowNumber+2, cellNumber, "images/ship1.gif");
               generalAdder(rowNumber+3, cellNumber, "images/ship1.gif");
            
             //commands that delets the selected ship so you can't re-use it
             (shipPlace).remove();
             shipPlace = null;  
            }
            }
      }
            
            
    function addShipPenta(rowNumber, cellNumber){  
              
              //checks if their is enough space to place the ship
              if(rowNumber>=1 && cellNumber>=1 && shipPlace != null &&     
                isEmptyArround(rowNumber, cellNumber) &&
                isEmptyArround(rowNumber+1, cellNumber) &&
                isEmptyArround(rowNumber+2, cellNumber) &&
                isEmptyArround(rowNumber+3, cellNumber) &&
                isEmptyArround(rowNumber+4, cellNumber)){   
            
              //checks if you selected a ship
              if(moving){                                                                                      
               
               //add the parts of the ship to the table
               generalAdder(rowNumber, cellNumber, "images/ship1.gif");
               generalAdder(rowNumber+1, cellNumber, "images/ship1.gif");
               generalAdder(rowNumber+2, cellNumber, "images/ship1.gif");
               generalAdder(rowNumber+3, cellNumber, "images/ship1.gif");
               generalAdder(rowNumber+4, cellNumber, "images/ship1.gif");
            
             //commands that delets the selected ship so you can't re-use it
             (shipPlace).remove();
             shipPlace = null;  
            }
            }
      }
            
            
    function addShipDoubleTurned(rowNumber, cellNumber){
             
              //checks if their is enough space to place the ship
              if(rowNumber>=1 && cellNumber>=1 && shipPlace != null &&     
                isEmptyArround(rowNumber, cellNumber) &&
                isEmptyArround(rowNumber, cellNumber+1) ){   
              
              //checks if you selected a ship
              if(moving){                                                                                      
                
               //add the parts of the ship to the table
               generalAdder(rowNumber, cellNumber, "images/doubleShipTurnedTop.gif");
               generalAdder(rowNumber, cellNumber+1, "images/DoubleShipTurnedBot.gif");
              
              //commands that delets the selected ship so you can't re-use it
              (shipPlace).remove();
              shipPlace = null;  
            }
            }
      }


    function addShipTripleTurned(rowNumber, cellNumber){
      if(rowNumber>=1 && cellNumber>=1 && shipPlace != null &&     
        isEmptyArround(rowNumber, cellNumber) &&
        isEmptyArround(rowNumber, cellNumber+1) &&
        isEmptyArround(rowNumber, cellNumber+2)){   
      
      //checks if you selected a ship
      if(moving){                                                                                      
        
       //add the parts of the ship to the table
       generalAdder(rowNumber, cellNumber, "images/ship1.gif");
       generalAdder(rowNumber, cellNumber+1, "images/ship1.gif");
       generalAdder(rowNumber, cellNumber+2, "images/ship1.gif");
      
      //commands that delets the selected ship so you can't re-use it
      (shipPlace).remove();
      shipPlace = null;  
    }
    }
      }


    function addShipQuadraTurned(rowNumber, cellNumber){
        if(rowNumber>=1 && cellNumber>=1 && shipPlace != null &&     
          isEmptyArround(rowNumber, cellNumber) &&
          isEmptyArround(rowNumber, cellNumber+1) &&
          isEmptyArround(rowNumber, cellNumber+2) &&
          isEmptyArround(rowNumber, cellNumber+3)){   
        
        //checks if you selected a ship
        if(moving){                                                                                      
          
         //add the parts of the ship to the table
         generalAdder(rowNumber, cellNumber, "images/ship1.gif");
         generalAdder(rowNumber, cellNumber+1, "images/ship1.gif");
         generalAdder(rowNumber, cellNumber+2, "images/ship1.gif");
         generalAdder(rowNumber, cellNumber+3, "images/ship1.gif");
        
        //commands that delets the selected ship so you can't re-use it
        (shipPlace).remove();
        shipPlace = null;  
      }
      }
      }


    function addShipPentaTurned(rowNumber, cellNumber){
        if(rowNumber>=1 && cellNumber>=1 && shipPlace != null &&     
          isEmptyArround(rowNumber, cellNumber) &&
          isEmptyArround(rowNumber, cellNumber+1) &&
          isEmptyArround(rowNumber, cellNumber+2) &&
          isEmptyArround(rowNumber, cellNumber+3) &&
          isEmptyArround(rowNumber, cellNumber+4)){   
        
        //checks if you selected a ship
        if(moving){                                                                                      
          
         //add the parts of the ship to the table
         generalAdder(rowNumber, cellNumber, "images/ship1.gif");
         generalAdder(rowNumber, cellNumber+1, "images/ship1.gif");
         generalAdder(rowNumber, cellNumber+2, "images/ship1.gif");
         generalAdder(rowNumber, cellNumber+3, "images/ship1.gif");
         generalAdder(rowNumber, cellNumber+4, "images/ship1.gif");
        
        //commands that delets the selected ship so you can't re-use it
        (shipPlace).remove();
        shipPlace = null;  
      }
      }
      }
    
          
};
$(document).ready(placeShipInTable);
















/*
  var turnShip = function () {
 "use strict";

 $(".comment-input button").on("click", function (event) {
  
  
    if(moving){
      (shipPlace).remove();
      shipPlace = null; 
      
      if(heightOfShip == 70){
      var doubleShipTurned = new Image(70, 35);
      doubleShipTurned.src = "doubleShipTurned.gif";
      doubleShipTurned.id= "doubleShipTurned";
      doubleShipTurned.alt= "doubleShipTurned";
      document.body.appendChild(doubleShipTurned);
     
      var doubleShipTurned = document.getElementById("doubleShipTurned");
      doubleShipTurned.addEventListener("mousedown", initialClick, false);

      image = doubleShipTurned;
      shipPlace = doubleShipTurned; 
      heightOfShip = doubleShipTurned.height; 
      widthOfShip = doubleShipTurned.width;
      document.addEventListener("mousemove", move, false);
     
      $(doubleShipTurned).each(function() {
        $(this).insertAfter($(this).parent().find("#playerTable thead"));
    });
  }


    }
 });
};
$(document).ready(turnShip);
 */
   
