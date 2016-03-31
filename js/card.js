'use strict';

function Card(suites, value){
    this.suite = suites;
    this.value = value;
    this.element = this.createElement();
    this.isOpen = false;
    this.isDraggable = false;
    this.isDeck = true;
    this.parentSet = null;
}



Card.prototype.createElement = function(){
    var element = document.createElement('div');
    element.classList.add('card');
    element.style.background = 'url("../img/card-deck-01.jpg")';
    element.style.backgroundPosition = cardConstants.back.positionX + ' ' + cardConstants.back.positionY;
    return element;
};

Card.prototype.allowOpening = function() {
    this.element.addEventListener('click', this.openCard.bind(this));
};

Card.prototype.changeSet = function(newSet) {
    
    this.parentSet.removeCard(this);
    this.parentSet = newSet;
    this.parentSet.addCard(this);
};


Card.prototype.closeCard = function(){
    if(!this.isOpen){
        return;
    }
    this.isDraggable = false;

    this.isOpen = false;
    game.view.closeCard(this);
    this.element.onmousedown = null;        
    
};
    
Card.prototype.openCard = function(){
    if(this.isOpen){
        return;
    }
    this.isDraggable = true;
    
    if(this.isDeck){
        var openDeck = document.querySelector('#open-deck');
        openDeck.appendChild(this.element);
        
        if(openDeck.childNodes.length === game.cardDeck.cards.length){
            game.restoreExtraCardsOnEmpty();
        }
    }
    this.isOpen = true;
    game.view.showCard(this)
    game.movementHandler.dragHandler(this);        
    
};
