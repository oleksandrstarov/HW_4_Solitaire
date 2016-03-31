'use strict';

function View(){
    this.baseShiftForLists = 45;
    this.baseTransformScale = .9;

    this.moveCard = function(cardElement){
        cardElement.style.left =  0  + 'px';
        cardElement.style.top =  this.getShiftFromTop(cardElement) + 'px';
    };
    
    this.getShiftFromTop = function(element){
        if(element.parentElement.classList.toString().indexOf('extra-set') >= 0){
            return 0;
        }
        
         if(element.previousElementSibling !== null && element.previousElementSibling.style.top === null){
            return 0;
        }
        
        return isNaN(parseInt(element.parentElement.style.top))? 0 : this.baseShiftForLists;
    };
    
    this.getElement = function(id){
        var element = document.querySelector('#' + id);
        return element;
    };
    
    this.attachCard = function(cardElement, parentElement){
        parentElement.appendChild(cardElement);
        this.moveCard(cardElement);
    };
    
    this.showCard = function(card){
        card.element.style.backgroundPosition = card.value.position + ' ' + card.suite.position;
    };
    
    this.closeCard = function(card){
        card.element.style.backgroundPosition = cardConstants.back.positionX + ' ' + cardConstants.back.positionY;
    };
    
    this.reset = function(){
        var cardsArray = document.querySelectorAll('.card');
        for(var i = 0; i< cardsArray.length; i++){
            cardsArray[i].remove();
        }
    }
    
}