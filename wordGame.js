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
    console.log(`constructGuessString`);
    let guessString = ``, elementsClassName;
    for( let i = 0; i < 5; i++) {
        elementsClassName = `input-` + (i+1);
        guessString += document.getElementById(guessID).getElementsByClassName(elementsClassName)[0].innerHTML;
        console.log(guessString);
    }
    return guessString;
}

// function validateSubmission () {
//     console.log(`validateSubmission`);
// }

// function submitGuess (wotd, userGuess) {
//     // validateSubmission(); 
//     console.log(`submitGuess: ${wotd}`);
// }

function loseState () {
    alert(`you lose`);
}


// async function getWordOfTheDay () {
//     const wotdURL = `https://words.dev-apis.com/word-of-the-day/`;
//     try {
//         const response = await fetch(wotdURL);
//         if (!response.ok) {
//             throw new Error(`could not fetch resource`);
//         }
//         const processedResponse = await response.json();
//         const word = processedResponse.word;
//         submitGuess(word, `test`);
//         return word;
//     } catch(error) {
//         console.error(error);
//     }
// }

function init () {
    // let wotd;// = 
    // getWordOfTheDay().then((word) => {console.log(`wotd: ${word}`)});// {wotd = word;})
    // console.log(`1.) wotd: ${wotd}`);
    
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
            if (userGuess.length == 5) {
                // submitGuess(wotd, userGuess);
                guessNum++; // move focus to next row
                if (guessNum > 6) { 
                    loseState(); // TODO: finish loseState()
                    // TODO: add reset state
                }
                inputNum = 1;
                // console.log(`guessNum: ${guessNum}`);
            } else {
                // alert(`Guess Too Short!`)
            }
        }  
    })
}
init();