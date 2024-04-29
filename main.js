// footer date element
let year = new Date().getFullYear();
const copyRight = `&copy; ${year} Hackney - Wordle App`;
let currentYear = document.querySelector('#currentYear').innerHTML = copyRight;



/***** 
    grid / board cols == 5, rows == 6
*****/ 

// number of guesses
const totalRows = 6;
// length of word
const totalCols = 5;

// current row and col on while playing game
let currentRow = 0;
let currentCol = 0;

//  guess finished or not
let gameOver = false;

//  array secret words
let wordList = ['apple', 'chair', 'effort', 'house', 'press', 'willy', 'hello', 'world', 'adapt', 'awake', 'naval', 'blush', 'heath', 'pears', 'focus', 'today', 'cloth', 'ahead', 'brine'];
// select a random word from the array
let word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
console.log(word)


window.onload = function(){
    intialise();
}


// initialise the game board
const intialise = () => {

    // create the game board
    for (let row = 0; row < totalRows; row++) {
        for (let col = 0; col < totalCols; col++) {
            // using span to inline elements
            let tile = document.createElement("span");
            tile.id = row.toString() + "-" + col.toString();
            tile.classList.add("tile");
            // leave the inner element empty
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // listen for key press
    document.addEventListener("keyup", (e) => {
        // if true exit 
        if (gameOver) return; 

        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            // check if less than the number of available columns
            if (currentCol < totalCols) {
                // select current tile
                let currentTile = document.getElementById(currentRow.toString() + '-' + currentCol.toString());
                // check if current tile on is blank
                if (currentTile.innerText == "") {
                    // return element is "KEY*" only what the element in index 3
                    currentTile.innerText = e.code[3];
                    // increment column by one
                    currentCol++;
                }
            }
        }
        else if (e.code == "Backspace") {
            // if between 1 - 5 can press delete
            if (0 < currentCol && currentCol <= totalCols) {
                // decrement the column by one
                currentCol--;
            }
            // update the current tile as gone back one or more
            let currentTile = document.getElementById(currentRow.toString() + '-' + currentCol.toString());
            // reset the element to a blank string
            currentTile.innerText = "";
        }
        else if (e.code == "Enter") {
            // call function
            update();
            // start new currentRow
            currentRow++; 
            // start at 0 for new currentRow
            currentCol = 0; 
        }

        // check if all 6 attempts are finished
        if (!gameOver && currentRow == totalRows) {
            // change from false to true
            gameOver = true;
            // inform user of word
            document.getElementById("answer").innerText = `Answer is: ${word}`;
        }
    })

}


// update tile style status
const update = () => {

    // count number of correct characters
    let correct = 0;
    // iterate over the columns of the player guess
    for (let col = 0; col < totalCols; col++) {
        // select current tile
        let currentTile = document.getElementById(currentRow.toString() + '-' + col.toString());
        // get current character
        let char = currentTile.innerText;

        // check if in the correct position
        if (word[col] == char) {
             // if in correct index position add css class
            currentTile.classList.add("correct");
            // add one to correct count
            correct++;
        } // is it in the word
        else if (word.includes(char)) {
            // if in word add css class
            currentTile.classList.add("present");
        } // not in the word
        else {
            // if not in word add css class
            currentTile.classList.add("missing");
        }

        // update gameOver if player has already guessed correct, prior to completing attempts
        if (correct == totalCols) {
            gameOver = true;
        }
    }

}

