function Players(name, field){
    this.name = name;
    this.field = field;

    this.getName = function(){return this.name;};
    this.getField = function(){return this.field;};
    
}

var Game = function(playerOne, playerTwo){
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;

    this.getPlayerOne = function(){return this.playerOne;};
    this.getPlayerTwo = function(){return this.playerTwo;};
}

module.exports = Game;
 