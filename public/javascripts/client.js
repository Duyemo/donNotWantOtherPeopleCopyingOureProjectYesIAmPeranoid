var socket = new WebSocket("ws://localhost:3000");
            socket.onmessage = function(event){
                console.log(event.data);
            }
            socket.onopen = function(){
                socket.send("Connected!");
                
            };
           