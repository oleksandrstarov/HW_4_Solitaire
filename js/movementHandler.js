'use strict';

function MovementHandler(){
    
};


MovementHandler.prototype.dragHandler = function(card){
    var cardElement = card.element;
    var self = this;

    cardElement.onmousedown = function(e){
        e.stopPropagation();
        if(!card.isDraggable){
            return;
        }
        
        var draggedCards = [card];
        if(card.parentSet instanceof CardSet){
            draggedCards = card.parentSet.getDragList(card);
        }
        
        cardElement.style.zIndex = 1000;
        
        var elementShiftTop = isNaN(parseInt(cardElement.style.top))? 0 : parseInt(cardElement.style.top);

        var initialX = e.pageX;
        var initialY = e.pageY - elementShiftTop;

        self.moveAt(cardElement, 0, elementShiftTop);
       
        document.onmousemove = function(e){
            var x = e.pageX  - initialX;
            var y = e.pageY - initialY;
            self.moveAt(cardElement, x, y);
        };
        
        cardElement.onmouseup = function(e){
            debugger;
            cardElement.style.zIndex = 'inherit';
            var targetElement = self.getTargetElementOnMouseUp(e.x, e.y);
            var isSucess = false;
            if(targetElement && targetElement !== draggedCards[0].parentSet.element){
                var targetObject = self.getObjectById(targetElement.id);
                isSucess = self.assignCardsToNewSets(draggedCards, targetObject);
            }
            
            if(!isSucess){
                game.view.moveCard(draggedCards[0].element);
            }
            
            document.onmousemove = null;
            cardElement.onmouseup = null;
        };
    };
    
    cardElement.ondragstart = function(){
        return;
    };    
};

MovementHandler.prototype.moveAt = function(element, x, y){
    element.style.left = x/game.view.baseTransformScale + 'px';
    element.style.top = y/game.view.baseTransformScale + 'px';
};

MovementHandler.prototype.assignCardsToNewSets = function(draggedCards, targetObject){
    if(targetObject instanceof HomeSet && draggedCards.length > 1){
        game.view.moveCard(draggedCards[0].element);
        return false;
    }
    if(targetObject.isPossibleToAttach(draggedCards[0])){
        for(var card in draggedCards){
            draggedCards[card].changeSet(targetObject);
        }
        return true;
    }else{
        return false;
    }
};

MovementHandler.prototype.getTargetElementOnMouseUp = function(x, y){
    //4 home and 7 set
    var cardHolders = document.querySelectorAll('.rows > .card-holder');
    
    
    for(var index = 0; index < cardHolders.length; index++){
        
        var element = cardHolders[index];
        var left = element.offsetLeft;
        var right = element.offsetLeft + element.offsetWidth;
        var top = element.offsetTop;
        var bottom = element.offsetTop + element.offsetHeight;
       
        if(element.classList.toString().indexOf('set-container') >=0){
            var childElements = element.getElementsByTagName('div');
            bottom = bottom + childElements.length * game.view.baseShiftForLists;
            
        }
        
        if(left < x && right > x
        && top < y && bottom > y){
            return element;
        }
    }
    return null;
};


MovementHandler.prototype.getObjectById = function(id){
    var array = null;
    if(id.indexOf('set')>=0){
        array = game.cardSetsArray;
    }
    if(id.indexOf('home')>=0){
        array = game.homeSetsArray;
    }
    if(array !== null){
        for(var i = 0; i < array.length; i++){
            if(array[i].id === id){
                return array[i];
            }
        }
    }
    return null;
};




