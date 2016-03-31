'use strict';

function CardSet(id){
    this.id = 'set-'+id;
    this.element = game.view.getElement(this.id);

    this.cards = [];
    //this.openedCards = [];

}


CardSet.prototype.addCard = function(card){
    card.isDeck = false;
    //card.parentSet = this;
    
    
    
    if(card.isOpen){
        card.isDraggable = true;
    }
    
    if(this.cards.length > 0){
        game.view.attachCard(card.element, this.cards[this.cards.length-1].element);
    }else{
        game.view.attachCard(card.element, this.element);
    }
    this.cards.push(card);
};


CardSet.prototype.isPossibleToAttach = function(card){
    var cardId = card.value.id;
    var cardColor = card.suite.color;
    
    if(this.cards.length === 0
    && cardId === 13){//king
        return true;
    }
        
    if(this.cards.length > 0){
        var previousCard = this.cards[this.cards.length-1];
        var previousCardId = previousCard.value.id;
        var previousCardColor = previousCard.suite.color;
        
        if(previousCard.isOpen
        && previousCardColor != cardColor
        && cardId + 1 === previousCardId){
            return true;
        }
    }
    
    return false;
};

CardSet.prototype.removeCard = function(card){
    var cardIndex = this.cards.indexOf(card);

    if(cardIndex >= 0 && this.cards.length > 0){
        this.cards.splice(cardIndex, 1);
    }
    console.log(this.cards);
    
    if(this.cards.length > 0){
        var lastCard = this.cards[this.cards.length-1];
        if(!lastCard.isOpen){
            lastCard.allowOpening();
        }
        
    }
 
};


CardSet.prototype.getDragList = function(card){
    var cardList = [];
    var cardIndex = this.cards.indexOf(card);
    
    for(;cardIndex < this.cards.length; cardIndex++){
        cardList.push(this.cards[cardIndex]);        
    }
    return cardList;
    
};



