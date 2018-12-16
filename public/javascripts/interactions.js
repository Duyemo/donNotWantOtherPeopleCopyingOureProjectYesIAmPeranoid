
var socket = new WebSocket("ws://localhost:3000");
var whichPlayer = "none";
var yourTurn = false;

var opponentsField = [];
var field = [];

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

        socket.send(JSON.stringify(msg));

        socket.send(Messages.S_PLAYER_READY);


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
            yourTurn = true;

        }

        if (inMSg.type == "PLAYER_TWO") {
            console.log("You are player two");
            whichPlayer = "Player two";
            yourTurn = false;
        }

        if (inMSg.type == "BOTH_READY") {
            console.log("You are both ready");
            document.getElementById("OpponentsTextId").innerHTML = "Oppents ships";
            document.getElementById("errorMessage").innerHTML = "";


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
   
    // new Audio("\public\javascripts\test.wav").play();
}

// the sound object
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


