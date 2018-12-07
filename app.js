var express = require("express");
var http = require("http");
var indexRouter = require("./routes/index");

var websocket = require("ws");

var port = process.argv[2];
var app = express();

app.use(express.static(__dirname + "/public"));
app.use("/", indexRouter);
app.get("/play", indexRouter);

var server = http.createServer(app);

const wss = new websocket.Server({ server });

wss.on("connection", function(ws) {
    var i = 0;
    ws.send("connected to server " + i);
    ws.on("message", function incoming(message) {
        console.log(message);
        i = i + 1;
    });
});

wss.on('connection', (ws) => {
    ws.on('message', (m) => {
        console.log('received: %s', m);
    });

    console.log(wss.clients.size);
});

server.listen(port);
