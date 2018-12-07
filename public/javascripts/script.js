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

