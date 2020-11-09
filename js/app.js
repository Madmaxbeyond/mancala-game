/*----- constants -----*/
const players = {
    '1': 'pink', // currentPits
    '-1': 'green', // otherPits
}


/*----- app's state (variables) -----*/
let turn = 1;


let currentPits = [4, 4, 4, 4, 4, 4];
let otherPits = [4, 4, 4, 4, 4, 4];
let currentWell = 0;
let otherWell = 0;
let winner;



/*----- cached element references -----*/
let pits = document.querySelectorAll('.pocket-a');
let pits = document.querySelectorAll('.pocket-b');
let msgEl = document.getElementById('msg');
let replayBtn = document.getElementById('button');


/*----- event listeners -----*/
document.getElementById('container').addEventListener('click', handleClick);
document.getElementById('replay-btn').addEventListener('click', init);



/*----- functions -----*/
// Will need the below function for trading off turns. Need to change terms
// function handleClick(evt) {
//     if (evt.target.id === 'container') return;
//     if (board[evt.target.id]) return;
//     if (winner === true) return;
//     board[evt.target.id] = turn;
//     turn *= -1;
//     render();
// }


function handleClick() {

}

// Changing number of stones in each pit
// pit is index number of pit and stones is number of stones
function addStones(pit, stones) {
    if(pit === 6) {
        currentWell += stones;
    } else if (pit === 13) {
        otherWell[pit] += stones;
    } else if (pit < 6) {
        currentPits[pit] += stones;
    } else if (pit > 6) {
        otherPits[pit - 7] += stones;
    }
}


function init() {

    render();
}


function render() {

}


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