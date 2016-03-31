'use strict';

function Game(){
    this.view = new View();
    this.movementHandler = new MovementHandler();
    this.cardDeck = null;
    this.cardSetsArray = null;
    this.homeSetsArray = null;
}

Game.prototype.createCardDeck = function(){
    var cardDeck = new CardDeck(this.actionHandler);
    return cardDeck;
}



Game.prototype.createCardSets = function(){
    var cardSetsArray = [];
    
    for(var i = 0; i<document.querySelectorAll('.set-container').length; i++){
        var cardSet = new CardSet(i, this.actionHandler);
        cardSetsArray.push(cardSet);
    }

    return cardSetsArray;
};

Game.prototype.createHomeSets = function(){
    var homeSetsArray = [];
    
    for(var i = 0; i<document.querySelectorAll('.home').length; i++){
        var homeSet = new HomeSet(i, this.actionHandler);
        homeSetsArray.push(homeSet);
    }
    return homeSetsArray;
};

Game.prototype.fillCardSets = function(){
    for(var setsCount = 0; setsCount < this.cardSetsArray.length; setsCount++){
        for(var cardsCount = 0; cardsCount <= setsCount; cardsCount++){
            var card = this.cardDeck.cards.pop();
            if(cardsCount === setsCount){
                card.openCard();
            }
            card.changeSet(this.cardSetsArray[setsCount]);
        }   
    }
};

Game.prototype.setExtraCards = function(){
    var deckContainer = document.querySelector('#deck');
    for(var card in this.cardDeck.cards){
        this.view.attachCard(this.cardDeck.cards[card].element, deckContainer);
        this.cardDeck.cards[card].allowOpening();
    }
};

Game.prototype.restoreExtraCardsOnEmpty = function(){
    var deckContainer = document.querySelector('#deck');
    var cardDeck = this.cardDeck;

    setTimeout(function(){
        deckContainer.onclick = function(){
        
            for(var card in cardDeck.cards){
                cardDeck.cards[card].closeCard();
                deckContainer.appendChild(cardDeck.cards[card].element);
            }
            deckContainer.onclick = null;

        };
    }, 1);
};

Game.prototype.checkComplition = function(){
    setTimeout(function() {
        var completedCards = 0;
        for(var i = 0; i < game.homeSetsArray.length; i++){
            completedCards += game.homeSetsArray[i].cardsArray.length;
        }
        console.log(game.homeSetsArray);
        if(completedCards === 52){
            alert('You Win! Congratulations!');
        };
            
    }, 10);
};


