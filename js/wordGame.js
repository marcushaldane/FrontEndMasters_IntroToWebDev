function isLetter (keyStroke) {
    return /^[a-zA-Z]$/.test(keyStroke);
}
function isBackSpace (keyStroke) {
    if (keyStroke === "Backspace" || keyStroke === "Delete") { return true; }
    return false;
}
function isEnter (keyStroke) {
    if (keyStroke === "Enter") { return true; }
    return false;
}
function isEmpty (guessID, inputID) {
    if (document.getElementById(guessID).getElementsByClassName(inputID)[0].innerHTML === ``) { return true; }
    return false;
}

function changeInnerText (guessID, inputID, keyPress) { 
    document.getElementById(guessID).getElementsByClassName(inputID)[0].innerHTML = keyPress;
}

function constructGuessString (guessID) {
    // console.log(`constructGuessString`);
    let guessString = ``, elementsClassName;
    for( let i = 0; i < 5; i++) {
        elementsClassName = `input-` + (i+1);
        guessString += document.getElementById(guessID).getElementsByClassName(elementsClassName)[0].innerHTML;
        // console.log(guessString);
    }
    return guessString;
}

function submitGuess (wotd, userGuess) {
    // console.log(`submitGuess: ${wotd}`);
    if(wotd === userGuess) { return true; }
    return false;
}

function loseState (correctWord) {
    console.log(`You lose! The word was ${correctWord}`);
}

function winState (guessID, correctWord) {
    // console.log(`guessID: ${guessID}`);
    let boxes = document.getElementById(guessID).children;
    for(let i = 0; i < 5; i++) {
        boxes[i].classList.add(`green-box`);
    }
    console.log(`You win! Great job guessing ${correctWord}`);
}

function displayRsandWs (guessID, word) {
    // console.log(`rights and wrongs`);
    let boxes = document.getElementById(guessID).children;
    for(let i = 0; i < 5; i++) {
        if (boxes[i].innerText === word[i]){
            boxes[i].classList.add(`green-box`);
            word = word.replace(boxes[i].innerText, `_`);
        } else if (word.includes(boxes[i].innerText)) {
            boxes[i].classList.add(`yellow-box`);
            word = word.replace(boxes[i].innerText, `_`);
            // console.log(`word: ${word}`);
        }
    }
}

async function fetchWordData () {
    try {
        const response = await fetch(`https://words.dev-apis.com/word-of-the-day?random=1`);
        if (!response.ok) {
            throw new Error(`Could not fetch resource.`);
        }
        const data = await response.json();
        console.log(data.word);
        return data.word;
    } catch(error) {
        console.error(error);
    }
}

async function validateSubmission (userGuess) {
    try {
        const response = await fetch(`https://words.dev-apis.com/validate-word`, {
            method: `POST`,
            body: JSON.stringify({
                word: `${userGuess}` 
            })
        })
        if (!response.ok) {
            throw new Error(`Could not fetch resource.`);
        }
        const data = await response.json();
        return data.validWord;
    } catch(error) {
        console.error(error);
    }
}

async function init () {
    let guessNum = 1;
    let inputNum = 1;
    let lock = true;
    let word;
    let validWord;
    
    await fetchWordData().then((aWord) => {
        word = aWord;
        lock = false;
    });

    // await validateSubmission(userGuess).then((wordValidated) => {
    //     validWord = wordValidated;
    // });
    
    window.addEventListener(`keydown`, async (e) => {
        if(!lock) { // lock or unlocked game state
            let keyPress = e.key;
            let inputID = `input-` + inputNum;
            let guessID = `guess-` + guessNum;
            
            if (isLetter(keyPress) && isEmpty(guessID, inputID)) {
                if (inputNum < 5) {
                    inputNum++;
                } 
                changeInnerText(guessID, inputID, keyPress.toLowerCase());
            } else if (isBackSpace(keyPress)) {
                if (inputNum > 1 && isEmpty(guessID, inputID)) {
                    inputNum--;
                    inputID = `input-` + inputNum;
                } 
                changeInnerText(guessID, inputID, ``);
            } else if (isEnter(keyPress)) {
                let userGuess = constructGuessString(guessID);
                if (userGuess.length == 5) {
                    let validationResult = await validateSubmission(userGuess);
                    let hasWon = false;
                    console.log(`validationResult: ${validationResult}`);
                    if(validationResult) {
                        let correctGuess = submitGuess(word, userGuess);
                        if (correctGuess) {
                            winState(guessID, word); 
                            hasWon = true;
                            lock = true;
                        } else {
                            displayRsandWs(guessID, word);
                        }
                    }
                    guessNum++; // move focus to next row
                    if ((guessNum > 6) && (!hasWon)) { 
                        loseState(word); // TODO: finish loseState()
                        lock = true;
                        // TODO: add reset state
                    }
                    inputNum = 1;
                } else {
                    // alert(`Guess Too Short!`)
                }
            } 
        } // lock or unlocked game state
    }) // window keydown event listener 
}
init();