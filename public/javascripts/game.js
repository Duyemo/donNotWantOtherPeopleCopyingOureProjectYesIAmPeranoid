function Players(name, field){
    this.name = name;
    this.field = field;

    this.getName = function(){return this.name;};
    this.getField = function(){return this.field;};
    // this.ships; 
}