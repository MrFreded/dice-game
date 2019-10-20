/*

DICE GAME

GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


const UIController = (function(){
    var domStrings ={
        btnRoll:'.btn-roll',
        dice: '.dice',
        btnHold: '.btn-hold',
        btnNew: '.btn-new',
        name: '#name-',
    }
    return{
        getStrings: function(x){
          document.querySelector(domStrings.dice).src = 'dice-' + x + '.png';
        },
        diceDisplay: function(y){
          document.querySelector(domStrings.dice).style.display = y;
        },  
        getRollListeners: function(ran){
          document.querySelector(domStrings.btnRoll).addEventListener('click', ran);
        },
        getHoldListener:function(hld){
          document.querySelector(domStrings.btnHold).addEventListener('click', hld);

        },
        getNewGameListener:function(neu){
          document.querySelector(domStrings.btnNew).addEventListener('click', neu);
        },
        addWinner: function(win){
        document.querySelector(domStrings.name + win).innerHTML = 'Winner!';
        },
        addPlayer1: function(pl1){
          document.querySelector(domStrings.name + pl1).innerHTML = 'Player 1';
        },
        addPlayer2: function(pl2){
          document.querySelector(domStrings.name + pl2).innerHTML = 'Player 2';
        },
        togActive:function(pal){
          document.querySelector('.player-'+ pal +'-panel').classList.toggle('active')
        },
        addClass:function(pl,cl){
          document.querySelector('.player-'+ pl +'-panel').classList.add(cl)
        },
        removeClass:function(pl,cl){
          document.querySelector('.player-'+ pl +'-panel').classList.remove(cl)
        },
        totalScoreDisplay: function(tol, act ){
          document.querySelector('#score-'+ act).innerHTML = tol;
        },
        scoreDisplay: function(cur,act){
          document.querySelector('.current-score-'+ act).innerHTML = cur;
        }   
    }
})();


const gameController = (function(UI){
    var gameActive = true;
    var currentScore= 0;
    var activePlayer = 0;
    var scorePot = [0,0];
    UI.diceDisplay('none');
    //get random number and change display on dice
    const getRandom = function(){ 
            if (gameActive == true){
                num = Math.floor(Math.random()* 6) + 1;
                currentScore += num
              if(num !==1){
                //display dice 
                  UI.getStrings(num); 
                  UI.diceDisplay('block');
                  // update current score
                  UI.scoreDisplay(currentScore, activePlayer)  
              }else{
                //next player
                  nextTurn();
              }         
            }                          
    } 
    //hold, update total score and check winner and turn off game
    const getHold = function(){
        if( gameActive == true) {
        scorePot[activePlayer] += currentScore;
        UI.totalScoreDisplay(scorePot[activePlayer], activePlayer)
          //winner 
        if( scorePot[activePlayer] >= 100){
            gameActive = false;
            currentScore = 0;
            UI.scoreDisplay(currentScore, activePlayer) 
            UI.diceDisplay('none');
            UI.removeClass(activePlayer, 'active');
            UI.addClass(activePlayer, 'winner');
            UI.addWinner(activePlayer);
        }else{
            nextTurn();
        }
        }
    }
    //next player- initialise all scores and change activeplayer value
    const nextTurn = function(){
            currentScore = 0;
            UI.scoreDisplay(currentScore, activePlayer); 
            UI.diceDisplay('none');
            activePlayer === 0? activePlayer = 1: activePlayer = 0;
            UI.togActive(0);
            UI.togActive(1);
          
    }
     //initiliase all
    const newGame = function(){
        gameActive = true;
        UI.removeClass(activePlayer, 'winner');
        activePlayer = 0;
        currentScore = 0;
        scorePot = [0,0];
        UI.removeClass(0, 'active');
        UI.removeClass(1, 'active');
        UI.addPlayer1(0);
        UI.addPlayer2(1);
        UI.addClass(activePlayer, 'active');
        UI.diceDisplay('none');
        UI.scoreDisplay(currentScore, 0)
        UI.scoreDisplay(currentScore, 1)  
        UI.totalScoreDisplay(scorePot[0], 0)
        UI.totalScoreDisplay(scorePot[1], 1)    
    }
    return {
        innit: function (){
            if (gameActive == true){
                UI.getRollListeners(getRandom);
                UI.getHoldListener(getHold);
                UI.getNewGameListener(newGame);
            }
        }
    }
})(UIController);

gameController.innit();

 