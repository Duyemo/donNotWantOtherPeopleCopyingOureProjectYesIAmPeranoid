(function(exports){


/* client to server: game is over, the winner is: */

/*  Server to client: abort the game the other one left */
exports.O_GAME_ABORTED = {type: "GAME-ABORTED"};
exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);

/* client to server: I'm ready */
exports.O_PLAYER_READY = {type: "PLAYER_READY"};
exports.S_PLAYER_READY = JSON.stringify(exports.O_PLAYER_READY);

/*  Server to client: set player one */
exports.O_PLAYER_ONE_READY = {type: "PLAYER_ONE_READY"};
exports.S_PLAYER_ONE_READY = JSON.stringify(exports.O_PLAYER_ONE_READY);

/* Server to client: set player two */
exports.O_PLAYER_TWO_READY = {type: "PLAYER_TWO_READY"};
exports.S_PLAYER_TWO_READY = JSON.stringify(exports.O_PLAYER_TWO_READY);

/* Players to server: done with moving the boats */

/* players to server: want to fire here */

/* server to player: hit */

/* server to player: miss */

//if the exports is undefined, we are on the client, else the server 
} (typeof exports === "undefined" ? this.Messages = {} : exports));