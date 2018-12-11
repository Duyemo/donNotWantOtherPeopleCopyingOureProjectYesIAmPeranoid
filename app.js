var express = require("express");
var http = require("http");
var indexRouter = require("./routes/index");

var websocket = require("ws");

var port = process.argv[2];
var app = express();

var Game = require("./game");
var gameList = [];

var Message = require("./public/javascripts/message");

// make client array
queue = [];



// for the routes
app.use(express.static(__dirname + "/public"));
app.use("/", indexRouter);
app.get("/play", indexRouter);

//creates server
var server = http.createServer(app);

//create websocket
const wss = new websocket.Server({ server });

// if connected, sends connected to server. And print to console log messages from server
wss.on("connection", function(ws) {

    // push the new client to the clients array
    queue.push(ws);

    
    ws.send("connected to server ");
    
    // for all the incomming messages
    ws.on("message", function incoming(message) {
        console.log('received: %s', message);
        let inMSG = JSON.parse(message);
        console.log(inMSG);
      
    });
    
    
});

// prints the amount of connected clients.
wss.on('connection', (ws) => {
    
    console.log("the client size is :", wss.clients.size);
    
});

wss.on("connection", function(ws) {
// if we have two players connected we do somthing
if(queue.length >= 2){
    var playerOne = queue.shift();0
    var playerTwo = queue.shift();9
    
    var game = new Game(playerOne, playerTwo, 1);
    game.getPlayerOne().send("you connected to a player 1");
    game.getPlayerTwo().send("you connected to a player");
   

    

    gameList.push(game);
    console.log("the gamelist length is:", gameList.length);
   
}
});



// listens to port 3000
server.listen(port);
