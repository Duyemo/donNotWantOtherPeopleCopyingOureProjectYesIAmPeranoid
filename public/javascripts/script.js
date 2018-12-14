var numberOfSHipsSunk = 0; 
function fire(elem) {
    
    //2 variables and a function used to check if a ship thats hit is sunk or not
    var hasSunk = 0;
    var hasNotSunk = 0;
    
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
    
    // debug zooi
    console.log("elem.id", elem.id);
    console.log("id opponents field", opponentsField[12]);
    console.log("does it contains?", opponentsField[elem.id - 1] == "contains");

    // if there is a ship it will be a hit, otherwise it will be a miss
    if (yourTurn) { // first check if it is your turn, then check did you already shoot there? 
        if (opponentsField[elem.id - 1] == "contains" && (elem.style.backgroundColor != "rgb(0, 255, 0)" && elem.style.backgroundColor != "tomato")) {
            console.log("elem.id", elem.id);
            
            hit(elem.id);
            elem.style.backgroundColor = "#00FF00";

           //new code to check if the ship that's hit is sunk or not
            opponentsField[elem.id - 1] = "sunk";
            sunkOrNot(elem.id-1," ");
            if(hasSunk > hasNotSunk){
                console.log("ship has sunk");

                // send the message to the other player
                let msg = Messages.O_SHIP_SUNK;
                msg.player = whichPlayer;
                socket.send(JSON.stringify(msg));

                //message to the client
                document.getElementById("errorMessage").innerHTML = "You let the ship sink";

                numberOfSHipsSunk++;
                console.log(numberOfSHipsSunk);
            }
            else{console.log("ship has NOT sunk");}
            hasSunk=0; 
            hasNotSunk=0;
            if(numberOfSHipsSunk == 8){
               console.log("you won");
               document.getElementById("errorMessage").innerHTML = "You won!";
               let msg = Messages.O_WINNER;
               msg.player = whichPlayer;
               socket.send(JSON.stringify(msg));
            }
        }
        // if there is no boat you mis
        if (opponentsField[elem.id - 1] != "contains" && (elem.style.backgroundColor != "tomato" && elem.style.backgroundColor != "rgb(0, 255, 0)")) {
            mis(elem.id);
            elem.style.backgroundColor = "tomato";

            // send your turn message to the other player 
            yourTurn = false;
            let turns = Messages.O_YOUR_TURN;
            turns.player = whichPlayer;
            socket.send(JSON.stringify(turns));
        }
        
    } else {
        //if you try to shoot but it is not your turn, you get an error message
        console.log("not your turn");
        document.getElementById("errorMessage").innerHTML = "Its not your turn";
    }
}

function hit(input) {
    // change image
    document.images["hit"].src = "images/hit.gif";

    console.log("input", input);
    //send hit message to other player
    let msg = Messages.O_HIT;
    msg.player = whichPlayer;
    msg.position = input;

    console.log(msg);
    socket.send(JSON.stringify(msg));
}

function mis(input) {
    // change image
    document.images["mis"].src = "images/mis.gif";

    //send mis message to other player
    let msg = Messages.O_MIS;
    msg.player = whichPlayer;
    msg.position = input;

    console.log(msg);
    socket.send(JSON.stringify(msg));
}




