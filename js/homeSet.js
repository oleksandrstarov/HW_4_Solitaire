'use strict';

function HomeSet(id) {
    this.id = 'home-' + id;
    this.element = game.view.getElement(this.id);
    this.suite = null;
    this.cardsArray = [];
}

HomeSet.prototype.addCard = function(card){
    card.isDraggable = false;
    this.cardsArray.push(card);
    game.view.attachCard(card.element, this.element);
    game.checkComplition();
};

HomeSet.prototype.isPossibleToAttach = function(card){
    var cardId = card.value.id;
    var cardSuite = card.suite.name;
    
    if(this.cardsArray.length === 0
    && cardId === 1){//Ace
        return true;
    }
        
    if(this.cardsArray.length > 0){
        var previousCard = this.cardsArray[this.cardsArray.length-1];
        var previousCardId = previousCard.value.id;
        var previousCardSuite = previousCard.suite.name;
        
        if(previousCardSuite === cardSuite
        && cardId - 1 === previousCardId){
            return true;
        }
    }
    return false;
};
