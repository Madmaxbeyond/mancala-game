/*----- constants -----*/
const players = {
    '1': 'pink', // player-1
    '-1': 'green', // player-2
    'null': 'white',
}

/*----- app's state (variables) -----*/
let turn = 1;
let board;
// let scores; // need to add scores function, possibly with reduce method??
let winner;




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

    if(turn === 1 && evt.target.id === '7') return;
    if(turn === 1 && evt.target.id === '0') return;
    if(turn === -1 && evt.target.id === '7') return;
    if(turn === -1 && evt.target.id === '0') return;
   
    if (evt.target.id === 'container') return;

    let pitIndex = parseInt(evt.target.id);
    let numOfStones = board[pitIndex]

    board[pitIndex] = 0;
    pitIndex += 1

    while (numOfStones > 0) {
        if (pitIndex === 14){
            pitIndex = 0
        }
        // continue? to skip wells at 0 and 7
        board[pitIndex] += 1;
        numOfStones -= 1;
        pitIndex += 1;
    }
    turn *= -1;
    render();
    console.log(board);
}

init();

function init() {
    board = [0, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3];
    turn = 1;
    winner = false;
    render();
}

function render() {
    console.log(board)
    board.forEach(function(numOfStones, idx) {
        pockets[idx].innerHTML = numOfStones;
    })
    if(turn === 1) {
        msgEl.innerText = "Player One's turn!";
    } 
    if(turn === -1) {
        msgEl.innerText = "Player Two's turn!";
    }
};


/*----- pseudo code pour moi -----*/
// - Write a function called gameStatus that takes two arguments, one an array and one an index value in the array.
// - Lowest index value is 0, highest value is 12
// - Set the value at given index to 0, then add the value of the index to each preceding index by adding one to each index.
// - The function should return the given array now with the changed values.

// Examples:
// gameStatus([3,3,4,2,3,5,1,3,3,3,3,3], 4); //=> [3,3,4,2,0,6,2,4,3,3,3,3]
// gameStatus([0,0,3,0,0,6], 2); //=> [0,0,0,1,1,7]

