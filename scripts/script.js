// Get all necessary DOM nodes
const selectPick = document.querySelectorAll('.select-pick img'); 
const gameWinner = document.querySelector('#game-winner');
const round = document.querySelector('#round');
const playerPicked = document.querySelector('.player-picked');
const playerScore = document.querySelector('#player-score')
const computerPicked = document.querySelector('.computer-picked');
const computerScore = document.querySelector('#computer-score')


// Declare all necessary variables
let playerScore = 0;
let computerScore = 0;
let roundMessage = '';
let gameRound = 0;

/* 
This function randomly returns the player's/computer's play
*/
function computerPlay(){
    const plays = ['rock', 'paper', 'scissors'];
    let random = Math.floor(Math.random() * plays.length);
    return plays[random];
}

/*
This function plays a single round of rock paper scissors
Takes in the player's and the computer's selection
Returns the round message for each call
*/
function playRound(playerSelection, computerSelection){
    if(playerSelection == computerSelection){
        gameRound++;
        roundMessage = 'Tie';
    }
    if(
       (playerSelection == 'rock' && computerSelection == 'scissors') ||
       (playerSelection == 'paper' && computerSelection == 'rock') ||
       (playerSelection == 'scissors' && computerSelection == 'paper')
    ){
        playerScore++;
        gameRound++;
        roundMessage = 'You win';
    }

    if(
        (computerSelection == 'rock' && playerSelection == 'scissors') || 
        (computerSelection == 'paper' && playerSelection == 'rock') ||
        (computerSelection == 'scissors' && playerSelection == 'paper')
    ){
        computerScore++;
        gameRound++;
        roundMessage = 'You lose';
    }
    return roundMessage;
}

/*
This function checks if the game is over
Return true if the player/computer has scored 5 points
*/
function isGameOver(){
    return playerScore === 5 || computerScore === 5; 
}