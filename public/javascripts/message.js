(function(exports){
/* client to server : connected */
exports.O_CONNECTED = {type: "CONNECTED"};
exports.S_CONNECTED = JSON.stringify(exports.O_CONNECTED);

/* client to server: I won */
exports.T_WINNER = "WINNER";
exports.O_WINNER = {type: exports.T_WINNER,
player: null
};

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



// for the stats:
/* server to client: new player */
exports.O_NEW_PLAYER = {type: "NEW_PLAYER"};
exports.S_NEW_PLAYER = JSON.stringify(exports.O_NEW_PLAYER);

/* server to client: new game */
exports.O_NEW_GAME = {type: "NEW_GAME"};
exports.S_NEW_GAME = JSON.stringify(exports.O_NEW_GAME);

/*client to server to client: this is my field */
exports.T_FIELD = "FIELD";
exports.O_FIELD = { type: exports.T_FIELD,
    data: null,
    player: null
};

/* client to server to client: its your turn */
exports.T_YOUR_TURN = "YOUR_TURN";
exports.O_YOUR_TURN = { type: exports.T_YOUR_TURN,
player: null
};

/* client to server to client: you ship sunk */
exports.T_SHIP_SUNK = "SHIP_SUNK";
exports.O_SHIP_SUNK = {type: exports.T_SHIP_SUNK,
player: null
};

/* client to server to client: hit */
exports.T_HIT = "HIT";
exports.O_HIT = {type: exports.T_HIT,
player: null,
position: null
};

/* client to server to client: mis */
exports.T_MIS = "MIS";
exports.O_MIS = {type: exports.T_MIS,
player: null,
position: null
};

/* server to client: game is aborted. */
exports.T_GAME_ABORTED = "GAME_ABORTED";
exports.O_GAME_ABORTED = {type: exports.O_GAME_ABORTED,
player: null
};

//if the exports is undefined, we are on the client, else the server 
} (typeof exports === "undefined" ? this.Messages = {} : exports));