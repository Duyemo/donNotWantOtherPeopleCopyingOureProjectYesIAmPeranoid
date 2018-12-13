function fire(elem) {
    var shipStat = 1;

    var hasSunk = 0;
    var hasNotSunk =0; 
    var sunkOrNot = function(elemID, previous){
      
        if (opponentsField[elemID + 1] == "contains"||
        opponentsField[elemID - 1] == "contains"||
        opponentsField[elemID + 11] == "contains"||
        opponentsField[elemID - 11] == "contains"){
            hasNotSunk ++;
        }
        else{
            if(opponentsField[elemID+ 1 ]=="sunk" && previous != "right" &&opponentsField[elemID - 1] == "sunk" && previous != "left"){
                sunkOrNot(elemID+1, "left");   sunkOrNot(elemID-1, "right"); hasNotSunk= hasNotSunk +2;}
            if(opponentsField[elemID + 11] == "sunk" && previous != "above" && opponentsField[elemID - 11] == "sunk" && previous != "below"){
                sunkOrNot(elemID+11, "below");  sunkOrNot(elemID-11, "above");  hasNotSunk= hasNotSunk +2;}
            if(opponentsField[elemID + 1] == "sunk" && previous != "right"){sunkOrNot(elemID+1, "left");}
            if(opponentsField[elemID - 1] == "sunk" && previous != "left"){sunkOrNot(elemID-1, "right");}
            if(opponentsField[elemID + 11] == "sunk" && previous != "above"){sunkOrNot(elemID+11, "below");}
            if(opponentsField[elemID - 11] == "sunk" && previous != "below"){sunkOrNot(elemID-11, "above");}
            else{hasSunk++;}
        }
    }
    

    console.log(elem.id);
    console.log("id opponents field", opponentsField[12]);
    console.log(opponentsField[elem.id - 1] == "contains");

    // if there is a ship it will be a hit, otherwise it will be a miss
    if (yourTurn) {
        if (opponentsField[elem.id - 1] == "contains" && (elem.style.backgroundColor != "rgb(0, 255, 0)" && elem.style.backgroundColor != "tomato")) {
            hit();
            elem.style.backgroundColor = "#00FF00";
            opponentsField[elem.id - 1] = "sunk";
            sunkOrNot(elem.id-1," ");
            if(hasSunk > hasNotSunk){console.log("ship has sunk");
            }
            else{console.log("ship has NOOOOOOOT sunk");}
            hasSunk=0; 
            hasNotSunk=0;
            
            
        
        }
        if (opponentsField[elem.id - 1] != "contains" && (elem.style.backgroundColor != "tomato" && elem.style.backgroundColor != "rgb(0, 255, 0)")) {
            mis();
            elem.style.backgroundColor = "tomato";

            yourTurn = false;
            let turns = Messages.O_YOUR_TURN;
            turns.player = whichPlayer;


            socket.send(JSON.stringify(turns));
        }
        
    } else {
        console.log("not your turn");
        document.getElementById("errorMessage").innerHTML = "Its not your turn";
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




