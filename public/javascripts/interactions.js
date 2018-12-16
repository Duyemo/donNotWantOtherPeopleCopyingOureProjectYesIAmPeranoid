
var socket = new WebSocket("ws://localhost:3000");
var whichPlayer = "none";
var yourTurn = false;

var yourOpponent = null;

var ready = false;
var opponentReady = false;

var opponentsField = [];
var field = [];
var gameStats ={
    
    since : Date.now(),
    gamesOnline: 0,
    playersOnline: 0,
    gamesPlayed: 0   
    
}

// var sound = document.getElementById("sound");


function gameState() {
    var counter = 0;

    var table = document.getElementById("playerTable");

    //iterate through rows
    for (var i = 0, row; row = table.rows[i]; i++) {
        //iterate through columns
        for (var j = 0, col; col = row.cells[j]; j++) {
            //gets if it contains a ship, then pushes it to the array
            if (col.id == "contains") {
                counter = counter + 1;
            }

            field.push(col.id);
        }

    }
    // when we moved all the boats to the field we can move one else we get error message
    if (counter == 21) {
        console.log("you are ready");
        document.getElementById("errorMessage").innerHTML = "You are ready... but we have to wait on our slow opponent"

        // console.log(field);

        let msg = Messages.O_FIELD;
        msg.data = field;
        msg.player = whichPlayer;
        msg.opponent = yourOpponent;
       

        socket.send(JSON.stringify(msg));

        let msgReady = Messages.O_READY;
        msgReady.player = whichPlayer;
        msgReady.opponent = yourOpponent;
        msgReady.opponentReady = opponentReady;

        socket.send(JSON.stringify(Messages.O_READY));

        ready = true;


        document.getElementById("gameChanger").removeEventListener("click", gameState);
    } else {
        console.log("please move all your boats to the field");
        document.getElementById("errorMessage").innerHTML = "Please move all your boats to the field.";
        
        
    }
};

(function setup() {

    // if we have an incomming message we put it in the console
    socket.onmessage = function (event) {
        console.log("you revieced this", event.data);
        let inMSg = JSON.parse(event.data);


        if (inMSg.type == "PLAYER_ONE") {
            console.log("You are player one");
            whichPlayer = "Player one";
            yourOpponent = inMSg.opponent;
            console.log("your opponent is", yourOpponent);
            
        

        }

        if (inMSg.type == "PLAYER_TWO") {
            console.log("You are player two");
            whichPlayer = "Player two";
            yourTurn = false;
            yourOpponent = inMSg.opponent
            console.log("your opponent is", yourOpponent);
            
          
        }

        if (inMSg.type == "BOTH_READY") {
            console.log("You are both ready");
            document.getElementById("OpponentsTextId").innerHTML = "Oppents ships";
            document.getElementById("errorMessage").innerHTML = "";
            console.log("we are both ready now");
            if(whichPlayer == "Player one"){
                yourTurn = true;
            }


            const start = Date.now();
            const inGameTimer = document.getElementById("inGameTimer");
            setInterval(function () {
                var timeInGame = Date.now() - start; //give time passed in ms
                var timeInGameSeconds = (Math.floor(timeInGame / 1000)); // convertes time form ms to s 
                inGameTimer.innerHTML = "Time spend in this game is: \n \n" + timeInGameSeconds + " seconds";
            }, 1000);

        }

        if (inMSg.type == "NEW_PLAYER") {
            console.log("new player");
            gameStats.playersOnline++;
            updateStats();
        }

        if (inMSg == "NEW_GAME") {
            console.log("new game");
            gameStats.gamesOnline++;
            gameStats.gamesPlayed++;
            updateStats();
        }

        if (inMSg.type == "FIELD") {
            opponentsField = inMSg.data;
        }

        if (inMSg.type == "YOUR_TURN") {
            yourTurn = true;
            console.log("my turn now");
        }

        if (inMSg.type == "SHIP_SUNK") {
            console.log("it sunk");
            document.getElementById("errorMessage").innerHTML = "Your ship sunk";
        }
        if (inMSg.type == "HIT") {
            console.log("the position", inMSg.position);
            console.log(field[inMSg.position - 1]);
            console.log(document.getElementsByClassName("pizza"));
            document.getElementsByClassName(inMSg.position)[0].style.backgroundColor = "tomato";
        }
        if (inMSg.type == "MIS") {
            document.getElementsByClassName(inMSg.position)[0].style.backgroundColor = "#3997d1";
        }
        if (inMSg.type == "WINNER") {
            document.getElementById("errorMessage").innerHTML = "oh no, you lost ;(";
            // end the game
        }
        if(inMSg.type == "GAME_ABORTED"){
            console.log("other person left the game");
            document.getElementById("errorMessage").innerHTML = "other person left the game, you will lose connection";
            socket.close();
        }
        if(inMSg.type == "READY"){
            opponentReady = true;
            document.getElementById("errorMessage").innerHTML = "your opponent is ready";
            if(ready == true){
                console.log("we are ready");
                let msg = Messages.O_BOTH_READY;
                msg.player = whichPlayer;
                msg.opponent = yourOpponent;

                socket.send(JSON.stringify(msg));

                console.log("You are both ready");
            document.getElementById("OpponentsTextId").innerHTML = "Oppents ships";
            document.getElementById("errorMessage").innerHTML = "";
            console.log("we are both ready now");
            if(whichPlayer == "Player one"){
                yourTurn = true;
            }


            const start = Date.now();
            const inGameTimer = document.getElementById("inGameTimer");
            setInterval(function () {
                var timeInGame = Date.now() - start; //give time passed in ms
                var timeInGameSeconds = (Math.floor(timeInGame / 1000)); // convertes time form ms to s 
                inGameTimer.innerHTML = "Time spend in this game is: \n \n" + timeInGameSeconds + " seconds";
            }, 1000);

            }

        }
        
    };

    socket.onclose = function(){
        console.log("you left the game");
        document.getElementById("errorMessage").innerHTML = "you are disconnected from the server";
    };

    // when we are open we start the whole game
    socket.onopen = function () {
        if(window.location.pathname == "/play"){
        socket.send(Messages.S_CONNECTED);

        start();
        }
    };
})();


// start the game
function start() {

    // make button which point to the function
    document.getElementById("gameChanger").addEventListener("click", gameState);
    document.getElementById("dropOut").addEventListener("click", dropOut);
    // new Audio("\public\javascripts\test.wav").play();
}

function dropOut(){
    console.log("I dropped out");

    
    let msg = Messages.O_GAME_ABORTED;
    msg.player = whichPlayer;
    msg.opponent = yourOpponent;

    socket.send(JSON.stringify(msg));
    socket.close();
}


