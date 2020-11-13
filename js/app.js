/*----- constants -----*/
const playerPits = {
    '1': [1,2,3,4,5,6],
    '-1': [8,9,10,11,12,13]
};

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
function isValidPitClicked(pitIndex) {
    return playerPits[turn].includes(pitIndex);
}

function handleMove(evt) {
    // Player cannot click anything except the pockets.
    if (evt.target.id === 'container') return;

    // Where the player clicks.
    let pitIndex = parseInt(evt.target.id);

    // Players cannot click end pockets nor click a pit with value zero.
    if(!isValidPitClicked(pitIndex) || pitIndex === 7 || pitIndex === 0 
        || board[pitIndex] === 0 || gameOver) return;

    // Loops over the board to assess values and change the values inside each pocket.
    distributeStones(pitIndex);
    gameOverNow();
    render();
}

function updateTurn(pitIndex) {
    if (pitIndex - 1 === 0 && turn === -1) {
        return;
    }
    if (pitIndex - 1 === 7 && turn === 1) {
        return;
    }
    turn *= -1;
}



function distributeStones(pitIndex) {
    // Number of stones/value depending on where player clicked.
    let numOfStones = board[pitIndex];
    board[pitIndex] = 0;
    pitIndex += 1;
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
        board[pitIndex] += 1;
        numOfStones -= 1;
        pitIndex += 1;
    }
    // Call the updateTurn function to add an extra turn when player's last stone ends in own mancala.
    updateTurn(pitIndex);
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
        const borderStyle = playerPits[turn].includes(idx) && numOfStones && !gameOver ? 
            '4px solid lime' : '4px solid white';
        pockets[idx].style.border = borderStyle;
    })
    if(turn === 1) {
        msgEl.innerText = "Player One, it's your turn!";
    } 
    if(turn === -1) {
        msgEl.innerText = "Your turn Player Two!";
    }

    // Assesses win conditions when a player has more points or there is a tie.
    if(board[0] > board[7] && gameOver) {
        msgEl.innerText = "Player Two Wins!";
    }
    if(board[7] > board[0] && gameOver) {
        msgEl.innerText = "Player Ones Wins!";
    }
    if(board[7] === board[0] && gameOver) {
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
