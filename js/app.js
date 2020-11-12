/*----- constants -----*/


/*----- app's state (variables) -----*/
let turn = 1;
let board;
let gameOver;


/*----- cached element references -----*/
let pockets = document.querySelectorAll('.pocket');
let msgEl = document.getElementById('msg');
let replayBtn = document.getElementById('replay-btn');


/*----- event listeners -----*/
document.getElementById('container').addEventListener('click', handleMove);
document.getElementById('replay-btn').addEventListener('click', init);


/*----- functions -----*/
function handleMove(evt) {
     // could be replaced with a loop over an array that represents the  "off limits" numbers
    //  Player cannot click other player's pockets.
    if(turn === 1 && evt.target.id === '13') return;
    if(turn === 1 && evt.target.id === '12') return;
    if(turn === 1 && evt.target.id === '11') return;
    if(turn === 1 && evt.target.id === '10') return;
    if(turn === 1 && evt.target.id === '9') return;
    if(turn === 1 && evt.target.id === '8') return;
   
    if(turn === -1 && evt.target.id === '1') return;
    if(turn === -1 && evt.target.id === '2') return;
    if(turn === -1 && evt.target.id === '3') return;
    if(turn === -1 && evt.target.id === '4') return;
    if(turn === -1 && evt.target.id === '5') return;
    if(turn === -1 && evt.target.id === '6') return;

    // Players cannot click end pockets.
    if(turn === 1 && evt.target.id === '7') return;
    if(turn === 1 && evt.target.id === '0') return;
    if(turn === -1 && evt.target.id === '7') return;
    if(turn === -1 && evt.target.id === '0') return;
   
    // Player cannot click anything except the pockets.
    if (evt.target.id === 'container') return;


    let pitIndex = parseInt(evt.target.id);
    let numOfStones = board[pitIndex];

    board[pitIndex] = 0;
    pitIndex += 1;

    // Loops over the board to assess values and change the values inside each pocket.
    while (numOfStones > 0) {
        // Sends stone around the loop if it lands above index 13
        if (pitIndex === 14){
            pitIndex = 0;
        }
        // Skips opposite player's end pit during turn. (Favorite! ¯\_(ツ)_/¯ )
        if (pitIndex === 0 && turn === 1) {
            pitIndex = 1;
        }
        if (pitIndex === 7 && turn === -1) {
            pitIndex = 8;
        }
        // continue? to skip wells at 0 and 7
        board[pitIndex] += 1;
        numOfStones -= 1;
        pitIndex += 1;
    }
    turn *= -1;
    render();
}

init();

function init() {
    board = [0, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3];
    turn = 1;
    gameOver = false;
    render();
}

// Changes the visible numbers in the browser and assigns messages to player turns.
function render() {
    board.forEach(function(numOfStones, idx) {
        pockets[idx].innerHTML = numOfStones;
    })
    if(turn === 1) {
        msgEl.innerText = "Player One, it's your turn!";
    } 
    if(turn === -1) {
        msgEl.innerText = "Your turn Player Two!";
    }

    gameOverNow();

    // Assesses win conditions when a player has more points or there is a tie.
    if(board[0] > board[7] && gameOver === true) {
        msgEl.innerText = "Player Two Wins!";
    }
    if(board[7] > board[0] && gameOver === true) {
        msgEl.innerText = "Player Ones Wins!";
    }
    if(board[7] === board[0] && gameOver === true) {
        msgEl.innerText = "It's rare but it happens...It's a Tie!";
    }
}

// Assesses game status by checking if indexes on the board are empty.
function gameOverNow() {
    if(board[1] + board[2] + board[3] + board[4] + board[5] + board[6] === 0) {
        return gameOver = true;
    }
    if(board[8] + board[9] + board[10] + board[11] + board[12] + board[13] === 0) {
        return gameOver = true;
    }
}
