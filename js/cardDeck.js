'use strict';

function CardDeck(){
    this.cards = this.createCardDeck();
    this.shuffle();

}

CardDeck.prototype.createCardDeck = function(actionHandler){
    var cards = [];
    for (var suite in cardConstants.suites) {
       for(var value in cardConstants.values){
           
           var card = new Card(cardConstants.suites[suite], cardConstants.values[value]);
           card.parentSet = this;
           cards.push(card);
       }
    }
    return cards;
};

CardDeck.prototype.shuffle = function(){
    this.cards.sort(function(){
        return Math.random() -.5;
    });
    
};

CardDeck.prototype.removeCard = function(card){
    card.isDeck = false;
    var cardIndex = this.cards.indexOf(card);
    if(cardIndex >= 0 && this.cards.length > 0){
        this.cards.splice(cardIndex, 1);
    }
};

