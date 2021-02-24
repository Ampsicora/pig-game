'use strict';

const dice                  = document.querySelector('.dice');
const btnRollDice           = document.querySelector('.btn--roll');
const btnHoldScore          = document.querySelector('.btn--hold');
const btnNewGame            = document.querySelector('.btn--new');
const player1               = document.querySelector('.player--0');
const player2               = document.querySelector('.player--1');
const currentScorePlayer1   = document.querySelector('#current--0');
const currentScorePlayer2   = document.querySelector('#current--1');
const holdScorePlayer1      = document.querySelector('#score--0');
const holdScorePlayer2      = document.querySelector('#score--1');
const feedbackPlayer1       = document.querySelector('.message--0');
const feedbackPlayer2       = document.querySelector('.message--1');

let diceNumber;


function generateRandomNumber (maxNumber = 6)
{
    return Math.floor((Math.random() * maxNumber) + 1);
}

function isWinner(playerScore, scoreGoal = 100)
{
    return (Number(playerScore.textContent) >= scoreGoal) ? playerScore.textContent = `${scoreGoal}` : false;
}

function switchPlayer (player, playerScore, otherPlayer)
{
    playerScore.textContent = 0;
    diceNumber              = 0;
    player.classList.remove('player--active');
    otherPlayer.classList.add('player--active');
}

function endGame(feedbackDOM, feedbackMessage = `You won! 🎉🎉🎉`)
{
    feedbackDOM.textContent = feedbackMessage;
    btnRollDice.disabled    = true;
    btnHoldScore.disabled   = true;
}

function newGame()
{
    switchPlayer(player2, currentScorePlayer2, player1);
    feedbackPlayer1.textContent     = "";
    feedbackPlayer2.textContent     = "";
    holdScorePlayer1.textContent    = 0;
    holdScorePlayer2.textContent    = 0;
    btnRollDice.disabled            = false;
    btnHoldScore.disabled           = false;
}

function holdScore()
{
    if (player1.classList.contains('player--active'))
    {
        holdScorePlayer1.textContent = String(Number(holdScorePlayer1.textContent) + diceNumber);
        isWinner(holdScorePlayer1) ? endGame(feedbackPlayer1) : switchPlayer(player1, currentScorePlayer1, player2);
    }
    
    else
    {
        holdScorePlayer2.textContent = String(Number(holdScorePlayer2.textContent) + diceNumber);
        isWinner(holdScorePlayer2) ? endGame(feedbackPlayer2) : switchPlayer(player2, currentScorePlayer2, player1);
    }
}

function rollDice ()
{
    diceNumber = generateRandomNumber();

    // Change dice image
    dice.src = `./imgs/dice-${diceNumber}.png`;
    
    // Set player current score to 0 if dice number is 1
    if (dice.src === `${location.protocol}//${location.hostname}:5500/imgs/dice-1.png`)
        return (player1.classList.contains('player--active')) ? switchPlayer(player1, currentScorePlayer1, player2) : switchPlayer(player2, currentScorePlayer2, player1);

    else
        // Update current player score
        player1.classList.contains('player--active') ? currentScorePlayer1.textContent = diceNumber : currentScorePlayer2.textContent = diceNumber;
}


btnNewGame.addEventListener('click', newGame);

btnRollDice.addEventListener('click', rollDice);

btnHoldScore.addEventListener('click', holdScore);
