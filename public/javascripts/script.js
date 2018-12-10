
// changes the game state
// 0 is before the game
// 1 is when playing
var gameState = function GameState() {

    // var name = "Test"
    var table = document.getElementById("playerTable");
    var field = [];
    //iterate through rows
    for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate through columns
        for (var j = 0, col; col = row.cells[j]; j++) {
            //gets if it contains a ship, then pushes it to the array
            field.push(col.id);
        }
    }
    console.log("I clicked");

    return{
        isClicked: true,
        field: field
    }
}

// module.exports = gameState;

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



