function Players(name, field){
    this.name = name;
    this.field = field;

    this.getName = function(){return this.name;};
    this.getField = function(){return this.field;};
    
}

var Game = function(playerOne, playerTwo, gameStatus){
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    
    this.gameStatus = gameStatus;

    this.playerTwoReady = false;
    this.playerTwoReady = false;

    this.getPlayerOne = function(){return this.playerOne;};
    this.getPlayerTwo = function(){return this.playerTwo;};

    this.getGameStatus = function(){return this.gameStatus;};

    this.isPlayerOneReady = function(){return this.isPlayerOneReady;};
    this.isPlayerTwoReady = function(){return this.isPlayerTwoReady;};
}



module.exports = Game;
 