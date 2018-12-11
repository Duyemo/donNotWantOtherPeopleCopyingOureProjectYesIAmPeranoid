// changes the game state
// 0 is before the game
// 1 is when playing
var socket = new WebSocket("ws://localhost:3000");
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
    
    socket.onopen = function(){
    socket.send("klikkkk!");
    console.log("test");    
    }

};

(function setup(){
    //var socket = new WebSocket("ws://localhost:3000");

    

    socket.onmessage = function(event){
        console.log(event.data);
    };

    socket.onopen = function(){
        socket.send("connected");
        gameState(socket);
    };
})();