function Players(name, field){
    this.name = name;
    this.field = field;

    this.getName = function(){return this.name;};
    this.getField = function(){return this.field;};
    
}

var Game = function(){
    this.playerOne = null;
    this.playerTwo = null;
    
    this.gameStatus = 0;

    this.playerTwoReady = false;
    this.playerTwoReady = false;

    this.getPlayerOne = function(){return this.playerOne;};
    this.getPlayerTwo = function(){return this.playerTwo;};

    this.addPlayerOne = function(p){return this.playerOne = p;};
    this.addPlayerTwo = function(p){return this.playerTwo = p;};

    this.getGameStatus = function(){return this.gameStatus;};

    this.isPlayerOneReady = function(){return this.isPlayerOneReady;};
    this.isPlayerTwoReady = function(){return this.isPlayerTwoReady;};

    this.nextGameStatus = function(){this.gameStatus = this.gameStatus + 1;};
}



module.exports = Game;
 