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

function loseState (correctWord, loseModal) {
    console.log(`You lose! The word was ${correctWord}`);
    const loseModalHeader = document.getElementById(`modal-header`);
    const loseModalTitle = document.getElementById(`modal-title`);
    const loseModalBody = document.getElementById(`modal-body`);
    loseModalHeader.style.background = `#f10f0f`
    loseModalTitle.innerText = `You Lost!`;
    loseModalBody.innerHTML = `The word was <span style="color: #f10f0f; font-weight: bold; padding-left: 2px; padding-right: 2px;">${correctWord.toUpperCase()}</span>. You should try again!`;
    openModal(loseModal);
}

function winState (guessID, correctWord, winModal) {
    // console.log(`guessID: ${guessID}`);
    let boxes = document.getElementById(guessID).children;
    for(let i = 0; i < 5; i++) {
        boxes[i].classList.add(`green-box`);
    }
    console.log(`You win! Great job guessing ${correctWord}`);
    const winModalHeader = document.getElementById(`modal-header`);
    const winModalTitle = document.getElementById(`modal-title`);
    const winModalBody = document.getElementById(`modal-body`);
    winModalHeader.style.background = `#00bc02`
    winModalTitle.innerText = `You've Won!`;
    winModalBody.innerHTML = `Great job guessing <span style="color: #00bc02; font-weight: bold; background-color: black; padding-left: 2px; padding-right: 2px; border: 1px solid black; border-radius: 2px;">${correctWord.toUpperCase()}</span>. Keep up the good work!`;
    openModal(winModal);
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

function shakeBoxes (guessID) {
    let boxes = document.getElementById(guessID).children;

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

// Followed `web dev simplified`'s tutorial video on modals: https://www.youtube.com/watch?v=MBaw_6cPmAw
function openModal (modal) {
    if (modal == null) {return}
    modal.classList.add(`active`);
    overlay.classList.add(`active`);
}

function closeModal (modal) {
    if (modal == null) {return}
    modal.classList.remove(`active`);
    overlay.classList.remove(`active`);
}
// Followed `web dev simplified`'s tutorial video on modals: https://www.youtube.com/watch?v=MBaw_6cPmAw



async function init () {
    let guessNum = 1;
    let inputNum = 1;
    let lock = true;
    let word;
    
    // const myModalButton = document.getElementById(`my-modal`);
    const myModal = document.getElementById(`modal`);
    const myOverlay = document.getElementById(`overlay`);
    
    // myModalButton.addEventListener(`click`, () => {
    //     openModal(myModal);
    //     // console.log(`button clicked`);
    // })
    
    document.getElementById(`play-again`).addEventListener(`click`, () => {
        closeModal(myModal);
        location.reload();
    })

    document.getElementById(`close-btn`).addEventListener(`click`, () => {
        closeModal(myModal);
    })
    
    myOverlay.addEventListener(`click`, () => {
        closeModal(myModal);
    })


    await fetchWordData().then((aWord) => {
        word = aWord;
        lock = false;
    });
    
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
                            winState(guessID, word, myModal); 
                            hasWon = true;
                            lock = true;
                        } else {
                            displayRsandWs(guessID, word);
                        }
                        guessNum++; // move focus to next row
                        inputNum = 1;
                    } else {
                        shakeBoxes(guessID);
                        // https://www.youtube.com/watch?v=mYZodBgTjsU
                    }
                    if ((guessNum > 6) && (!hasWon)) { 
                        loseState(word, myModal); // TODO: finish loseState()
                        lock = true;
                        // TODO: add reset state
                    }
                    
                } else {
                    // alert(`Guess Too Short!`)
                }
            } 
        } // lock or unlocked game state
    }) // window keydown event listener 
}
init();