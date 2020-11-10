/*----- constants -----*/
const players = {
    '1': 'pink', 
    '-1': 'green', 
    'null': 'white',
}


/*----- app's state (variables) -----*/
let turn = 1;
let board;
// let scores; // need to add scores function, possibly with reduce method??
let winner;

let numOfStones = board[pitIndex];

/*----- cached element references -----*/
// let currentPits = document.querySelectorAll('.pocket-a'); // can board equal this and pocket-a and pocket-b ??
// let otherPits = document.querySelectorAll('.pocket-b');
let stones = document.querySelectorAll('.pocket');
let msgEl = document.getElementById('msg');
let replayBtn = document.getElementById('replay-btn');

// let stonesNumberB = document.querySelectorAll('.pocket-b');


/*----- event listeners -----*/
document.getElementById('container').addEventListener('click', handleClick);
document.getElementById('replay-btn').addEventListener('click', init);



/*----- functions -----*/
function handleClick(evt) {
    if (evt.target.id === 'container') return;
    // if (board[evt.target.id]) return;
    // if (winner === true) return;
    board[evt.target.id] = turn;
    turn *= -1;
    render();
}

function handleMove(evt) {
    let pitIndex = parseInt(evt.target.id);
    // let numOfStones = board[pitIndex];
    board[pitIndex] = 0;
    while (numOfStones > 0) {
        if(pitIndex + 1 > 11) {
            pitIndex = 0;
        } else {
            board[pitIndex + 1] += 1;
            numOfStones -= 1;
            pitIndex += 1;
        }
        console.log(board);
    }
    if(pitIndex === 0 && turn === 1) {
        turn *= -1 * -1;
    }
    if(pitIndex === 7 && turn === -1) {
        turn *= -1 * -1;
    }
    render();
}

// function extraTurn() {
//     if ()
//      turn *= -1 * -1;
// }

function moveStones() {
    for(i = 0; i <= numOfStones; i++) { // possibly just = needed
        board[pitIndex] = 0;
        board[i] += 1;
    if(board[pitIndex] === 0 && turn === -1) {
        board[0] += 0;
    } else if (board[pitIndex] === 7 && turn === 1) {
        board[7] += 0;
    }
  }
}

init();

function init() {
    board = [0, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3];
    // currentPits = [3, 3, 3, 3, 3, 3];
    // otherPits = [3, 3, 3, 3, 3, 3];
    // currentWell = 0;
    // otherWell = 0;
    winner = false;

    render();
}


function render() {
    for(let i = 0; i < board.length; i++) {
        squares[i].style.backgroundColor = images[board[i]];

        // stones[i].innerText = numOfStones[board[i]];
    } 
    if(turn === 1) {
        msgEl.innerText = "Next player's turn!";
    } 
    if(turn === -1) {
        msgEl.innerText = "Next player's turn!";
    }
    // if(currentPits === 0) {
    //     msgEl.innerText = "Player One wins!";
    // } else if(otherPits === 0) {
    //     msgEl.innerText = "Player Two wins!";
    // }
    if(turn === 1) {
        stones.innerText = `${numOfStones}`;
    }
    // winning();
    // if(numStones > {{otherPlayerStones}} && turn === 1) { // include the otherPlayerStones as a reduce method to tally the scores (scores function?)
    //     msgEl.innerText = "Player One Wins!";
    // }
    // if(winner === true && turn === -1) {
    //     msgEl.innerText = "Player Two Wins!";
    // }
}

// Above include click events to change numbers inside pits/pockets


/*----- pseudo code pour moi -----*/
// - Write a function called gameStatus that takes two arguments, one an array and one an index value in the array.
// - Lowest index value is 0, highest value is 12
// - Set the value at given index to 0, then add the value of the index to each preceding index by adding one to each index.
// - The function should return the given array now with the changed values.

// Examples:
// gameStatus([3,3,4,2,3,5,1,3,3,3,3,3], 4); //=> [3,3,4,2,0,6,2,4,3,3,3,3]
// gameStatus([0,0,3,0,0,6], 2); //=> [0,0,0,1,1,7]


// Player turn ends if they did not end in the storage well:
// return pit !== 6;