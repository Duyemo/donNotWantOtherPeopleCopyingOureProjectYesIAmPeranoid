(function(exports){
/* client to server : connected */
exports.O_CONNECTED = {type: "CONNECTED"};
exports.S_CONNECTED = JSON.stringify(exports.O_CONNECTED);

/* client to server: game is over, the winner is: */

/*  Server to client: abort the game the other one left */
exports.O_GAME_ABORTED = {type: "GAME-ABORTED"};
exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);

/* client to server: I'm ready */
exports.O_PLAYER_READY = {type: "PLAYER_READY"};
exports.S_PLAYER_READY = JSON.stringify(exports.O_PLAYER_READY);

/* server to client: both are ready */
exports.O_BOTH_READY = {type: "BOTH_READY"};
exports.S_BOTH_READY = JSON.stringify(exports.O_BOTH_READY);

/* server to client: you are player one */
exports.O_PLAYER_ONE = {type: "PLAYER_ONE"};
exports.S_PLAYER_ONE = JSON.stringify(exports.O_PLAYER_ONE);

/* server to client: you are player two */
exports.O_PLAYER_TWO = {type: "PLAYER_TWO"};
exports.S_PLAYER_TWO = JSON.stringify(exports.O_PLAYER_TWO);

/* players to server: shot fired */
exports.O_SHOT_FIRED = {type: "SHOT_FIRED"};
exports.S_SHOT_FIRED = JSON.stringify(exports.O_SHOT_FIRED);

/* server to player: hit */

/* server to player: miss */

//if the exports is undefined, we are on the client, else the server 
} (typeof exports === "undefined" ? this.Messages = {} : exports));