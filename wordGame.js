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

function constructGuessString () {
    console.log(`constructGuessString`);
    let guessString = ``;
    return guessString;
}

function validateSubmission () {
    console.log(`validateSubmission`);
}

function submitGuess (userGuess) {
    // validateSubmission(); 
    console.log(`submitGuess`);
}

function loseState () {
    alert(`you lose`);
}

function init () {
    // document.querySelector(`.input-1`).focus();
    let guessNum = 1;
    let inputNum = 1;

    window.addEventListener(`keydown`, (e) => {
        
        let keyPress = e.key;
        // console.log(`e.key: ${keyPress}`);
        let inputID = `input-` + inputNum;
        // console.log(`inputID: ${inputID}`);
        let guessID = `guess-` + guessNum;
        // console.log(`guessID: ${guessID}`);

        if (isLetter(keyPress) && isEmpty(guessID, inputID)) {
            if (inputNum < 5) {
                inputNum++;
            } 
            changeInnerText(guessID, inputID, keyPress);
        } else if (isBackSpace(keyPress)) {
            if (inputNum > 1 && isEmpty(guessID, inputID)) {
                inputNum--;
                inputID = `input-` + inputNum;
            } 
            changeInnerText(guessID, inputID, ``);
        } else if (isEnter(keyPress)) {
            
            let userGuess = constructGuessString(guessID);
            // submit word
            submitGuess(userGuess);
            guessNum++; // move focus to next row
            if (guessNum > 6) { 
                loseState(); // TODO: finish loseState()
                // TODO: add reset state
            }
            inputNum = 1;
            // console.log(`guessNum: ${guessNum}`);
        }
        
    })
}
init();