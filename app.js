var express = require("express");
var http = require("http");
var indexRouter = require("./routes/index");

var websocket = require("ws");

var port = process.argv[2];
var app = express();

var Game = require("./game");
var gameList = [];

var gameStat = require("./public/javascripts/stats");
var Message = require("./public/javascripts/message");

// make client array
queue = [];
CLIENTS = [];



// for the routes
app.use(express.static(__dirname + "/public"));
app.use("/", indexRouter);
app.get("/play", indexRouter);

//creates server
var server = http.createServer(app);

//create websocket
const wss = new websocket.Server({ server });

// make a game
var currentGame = new Game();



// if connected, sends connected to server. And print to console log messages from server
wss.on("connection", function(ws) {

    // push the new client to the clients array
    queue.push(ws);
    CLIENTS.push(ws);

    sendAll(Message.S_NEW_PLAYER);

    gameStat.playersOnline++;
    console.log("Players online:", gameStat.playersOnline);

    
    ws.send(Message.S_CONNECTED);
    
    // for all the incomming messages
    ws.on("message", function incoming(message) {
        console.log('received: %s', message);
        let inMSG = JSON.parse(message);
        console.log(inMSG);
        

        

        if(inMSG.type == "PLAYER_READY"){
                // do stuff
                console.log(currentGame.getGameStatus());
                currentGame.nextGameStatus();
                console.log(currentGame.getGameStatus());
        }

       if(currentGame.getGameStatus() == 2){
           currentGame.getPlayerOne().send(Message.S_BOTH_READY);
           currentGame.getPlayerTwo().send(Message.S_BOTH_READY);
       }

      
    });
    
    
});

// prints the amount of connected clients.
wss.on('connection', (ws) => {
    
    console.log("the client size is :", wss.clients.size);
    
});

wss.on("connection", function(ws) {
// if we have two players connected we do somthing
if(queue.length >= 2){
    var playerOne = queue.shift();
    var playerTwo = queue.shift();
    
    currentGame.addPlayerOne(playerOne);
    currentGame.addPlayerTwo(playerTwo);
    
    currentGame.getPlayerOne().send(Message.S_PLAYER_ONE);
    currentGame.getPlayerTwo().send(Message.S_PLAYER_TWO);
   

    

    gameList.push(currentGame);
    sendAll(Message.S_NEW_GAME);

    

    gameStat.gamesOnline++;
    
    console.log("Amount of games online:", gameStat.gamesOnline);
    console.log("the gamelist length is:", gameList.length);
   
}
});

// to do write a send all function
function sendAll(message){
    for(var i = 0; i <CLIENTS.length; i++){
        CLIENTS[i].send(message);
    }
}

// listens to port 3000
server.listen(port);
