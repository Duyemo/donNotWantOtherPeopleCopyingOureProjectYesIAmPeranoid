
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
    
    socket.send(Messages.S_PLAYER_READY);
        
    
    document.getElementById("gameChanger").removeEventListener("click", gameState);
};

(function setup(){    

    // if we have an incomming message we put it in the console
    socket.onmessage = function(event){
        console.log(event.data);
    };

    // when we are open we start the whole game
    socket.onopen = function(){
        socket.send(Messages.S_CONNECTED);
        start();
    };
})();

// start the game
function start(){

    // make button which point to the function
    document.getElementById("gameChanger").addEventListener("click", gameState);

    

}

