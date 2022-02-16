// Get all necessary DOM nodes
const selectPick = document.querySelectorAll('.select-pick img'); 
const playerPicked = document.querySelector('.player-picked');
const playerScore = document.querySelector('#player-score')
const computerPicked = document.querySelector('.computer-picked');

const overlay = document.querySelector('.overlay');
const gameBoard = document.querySelector('.game-board');
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Declare all necessary variables
let pScore = 0;
let cScore = 0;
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
This function plays a round of rock paper scissors with 
the player's and the computer's selection and returns round message 
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
        pScore++;
        gameRound++;
        roundMessage = 'You win';
    }

    if(
        (computerSelection == 'rock' && playerSelection == 'scissors') || 
        (computerSelection == 'paper' && playerSelection == 'rock') ||
        (computerSelection == 'scissors' && playerSelection == 'paper')
    ){
        cScore++;
        gameRound++;
        roundMessage = 'You lose';
    }
    return uppdateUi(pScore, cScore, roundMessage, gameRound, computerSelection);
}

/*
This funnction uppdates the UI
*/
function uppdateUi(playerScore, computerScore, roundMessage, round, computerSelection){
    document.querySelector('#player-score').innerText = `Player's Score: ${playerScore}`;
    document.querySelector('#computer-score').innerText = `Computer's Score ${computerScore}`;
    document.querySelector('#game-winner').innerText = roundMessage;
    document.querySelector('#round').innerText = `Round ${round}`;

    switch(computerSelection){
        case 'rock':
            return computerPicked.innerHTML = '<img src="images/rock.png" alt="rock">';
        case 'paper':
            return computerPicked.innerHTML = '<img src="images/paper.png" alt="paper">';
        case 'scissors':
            return computerPicked.innerHTML = '<img src="images/scissors.png" alt="scissors">';
        default:
            return computerPicked.innerHTML = '<span> &quest; </span>';
    }
}

/*
This function checks which player has scored 5 points
*/
function gameWinner(){
    if(pScore == 5) return `Player won \nRound: ${gameRound} \nScore: ${pScore} - ${cScore}`;
    if(cScore == 5) return `Computer won \nRound: ${gameRound} \nScore: ${pScore} - ${cScore}`;
}

/*
Adds event listeners to each clickable image
*/
selectPick.forEach((selected) => {
   selected.addEventListener('click', handleClick);
});

/*
This function handles the click event
*/
function handleClick(e){
    playRound(e.target.id, computerPlay());
    playerPicked.innerHTML = `<img src="${e.target.currentSrc}" alt="${e.target.id}">`;
    if(pScore == 5 || cScore == 5){
        activeBlur();
        selectPick.forEach((selected) => selected.removeEventListener('click', handleClick));
        document.querySelector('.restart').addEventListener('click', () => {
            restartGame();
            disableBlur();
        });
    }
}

/*
This function resets the game
*/
function restartGame(){
    pScore = 0;
    cScore = 0;
    gameRound = 0;
    uppdateUi(cScore, pScore, 'Select your pick', gameRound);
    playerPicked.innerHTML = '<span> &quest; </span>';   
    selectPick.forEach((selected) => {
        selected.addEventListener('click', handleClick);
    });
}

/*
This function displays a popup and activates the blur effect on the background
*/
function activeBlur(){
    overlay.classList.add('active');
    gameBoard.classList.add('blur');
    header.classList.add('blur');
    footer.classList.add('blur');
    document.querySelector('#overlay-text').innerText = `${gameWinner()}`;
}

/*
This function disables the popup and disables the blur effect on the background
*/
function disableBlur(){
    overlay.classList.remove('active');
    gameBoard.classList.remove('blur');
    header.classList.remove('blur');
    footer.classList.remove('blur'); 
}