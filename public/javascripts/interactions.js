// changes the game state
// 0 is before the game
// 1 is when playing
var test = 0;
function gameState() {


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
    test = 1;


};
if (test == 1) {
    socket.onopen = function () {
        socket.send("something!");
    }
}
