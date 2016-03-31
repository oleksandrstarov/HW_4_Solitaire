'use strict';


function startGame(){
    window.game = new Game();
    window.init = function(game){
        game.cardDeck = game.createCardDeck();
        game.cardSetsArray = game.createCardSets();
        game.homeSetsArray = game.createHomeSets();
        game.fillCardSets();
        game.setExtraCards();
    };
    window.init(window.game);
};
startGame();