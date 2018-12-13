function fire(elem) {
    var shipStat = 1;

    console.log(elem.id);
    console.log("id opponents field", opponentsField[12]);
    console.log(opponentsField[elem.id - 1] == "contains");

    // if there is a ship it will be a hit, otherwise it will be a miss
    if (yourTurn) {
        if (opponentsField[elem.id - 1] == "contains" && (elem.style.backgroundColor != "rgb(0, 255, 0)" && elem.style.backgroundColor != "tomato")) {
            hit();
            elem.style.backgroundColor = "#00FF00";
        
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




