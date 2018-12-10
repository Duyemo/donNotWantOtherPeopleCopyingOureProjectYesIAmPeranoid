
// changes the game state
// 0 is before the game
// 1 is when playing
function gameState() {
    
    
    console.log("start the game");
    
    var name = "Test"
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

var PlayerOne = new Players(name, field);
console.log(PlayerOne.getName());
console.log(PlayerOne.getField());
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



