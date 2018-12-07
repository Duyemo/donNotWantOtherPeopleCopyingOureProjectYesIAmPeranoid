var express = require("express");
var http = require("http");
var indexRouter = require("./routes/index");

var websocket = require("ws");

var port = process.argv[2];
var app = express();

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
    
    ws.send("connected to server ");
    ws.on("message", function incoming(message) {
        console.log(message);
      
    });
});

// prints the amount of connected clients.
wss.on('connection', (ws) => {
    ws.on('message', (m) => {
        console.log('received: %s', m);
    });

    console.log(wss.clients);
});

// listens to port 3000
server.listen(port);
