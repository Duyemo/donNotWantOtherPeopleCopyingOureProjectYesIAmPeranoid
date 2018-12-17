// require everything
var express = require("express");
var http = require("http");
var indexRouter = require("./routes/index");

var websocket = require("ws");

var port = process.argv[2];
var app = express();

var gameStatus = require("./statTracker");
var Game = require("./game");
var gameList = [];

var gameStat = require("./public/javascripts/stats");
var Message = require("./public/javascripts/message");
gameStatus.gamesCompleted=1;
// make client array
queue = [];
CLIENTS = [];
IDs = [];

//set the view engine
app.set('view engine', 'ejs');

// for the routes
app.use(express.static(__dirname + "/public"));
app.use("/", indexRouter);
app.get("/play", indexRouter);

//new piece of code for templating stats. althoug it doesn't work after coopiïng it step by step
app.get("/", (req, res) => {
    res.render("splash.ejs", { gamesInitialized: gameStatus.gamesInitialized, gamesCompleted: gameStatus.gamesCompleted });
});


//creates server
var server = http.createServer(app);

//create websocket
const wss = new websocket.Server({ server });

// make a game
var currentGame = new Game(gameStatus.gamesInitialized++);
var connectionId = 0;



// if connected, sends connected to server. And print to console log messages from server
wss.on("connection", function (ws) {
    gameStatus.gamesCompleted++;
    ws.send(Message.S_CONNECTED);

    // for all the incomming messages
    ws.on("message", function incoming(message) {
        console.log('received: %s', message);
        let inMSG = JSON.parse(message);

        //only if we are connected with /play we make a new game
        if (inMSG.type == "CONNECTED") {
            // push the new client to the clients array
            queue.push(ws);
            CLIENTS.push(ws);
            
            gameID = connectionId;
            console.log("connection id", connectionId);
            
            IDs.push(connectionId);
            connectionId++;


            sendAll(Message.S_NEW_PLAYER);

            gameStat.playersOnline++;
            console.log("Players online:", gameStat.playersOnline);

            // if we have two players connected we do somthing
            if (queue.length >= 2) {
                var playerOne = queue.shift();
                var playerTwo = queue.shift();

                var p1ID = IDs.shift();
                var p2ID = IDs.shift();
                

                console.log("IDs", p1ID, p2ID);

                currentGame.addPlayerOne(playerOne);
                currentGame.addPlayerTwo(playerTwo);

                let p1msg = Message.O_PLAYER_ONE;
                p1msg.gameID = gameID/2;
                p1msg.opponent = p2ID;

                console.log("opponent 2 ID", p1msg.opponent);
                

                let p2msg = Message.O_PLAYER_TWO;
                p2msg.gameID = gameID/2;
                p2msg.opponent = p1ID;
                
                console.log("opponent 1 ID", p2msg.opponent);


                currentGame.getPlayerOne().send(JSON.stringify(p1msg));
                currentGame.getPlayerTwo().send(JSON.stringify(p2msg));

                gameList.push(currentGame);
                sendAll(Message.S_NEW_GAME);

                gameStat.gamesOnline++;

                console.log("Amount of games online:", gameStat.gamesOnline);
                console.log("the gamelist length is:", gameList.length);
            }
        }



        if (inMSG.type == "BOTH_READY") {
            // do stuff
            CLIENTS[inMSG.opponent].send(JSON.stringify(inMSG));

            if(inMSG == "Player one"){
                CLIENTS[inMSG.opponent - 1].send(JSON.stringify(inMSG));
            }
            if(inMSG == "Player two"){
                CLIENTS[inMSG.opponent + 1].send(JSON.stringify(inMSG));
            }
        }

       

        if (inMSG.player == "Player one") {
            console.log(inMSG.opponent);
            CLIENTS[inMSG.opponent].send(JSON.stringify(inMSG));
            
        }

        if (inMSG.player == "Player two") {
            CLIENTS[inMSG.opponent].send(JSON.stringify(inMSG));            
        }
    });

    ws.on("close", function (code) {
        console.log("it closed");

        if (code == 1001) {
            try {
                currentGame.getPlayerOne().close();
            } catch (e) {
                console.log(e);
            }
            try {
                currentGame.getPlayerTwo().close();
            } catch (e) {
                console.log(e);
            }
        }
    });
});

// prints the amount of connected clients.
wss.on('connection', (ws) => {

    console.log("the client size is :", wss.clients.size);
    console.log("ready state", ws.readyState);

});

wss.on("connection", function (ws) {



});





// to do write a send all function
function sendAll(message) {
    for (var i = 0; i < CLIENTS.length; i++) {
        CLIENTS[i].send(message);
    }
}

// listens to port 3000
server.listen(port);
