function isLetter (keyStroke) {
    return /^[a-zA-Z]$/.test(keyStroke);
}

function isBackSpace (keyStroke) {
    if (keyStroke === "Backspace" || keyStroke === "Delete") {
        return true;
    }
    return false;
}

function isEnter (keyStroke) {
    if (keyStroke === "Enter") {
        return true;
    }
    return false;
}

function moveFocus (nextFocus) {
    document.querySelector(nextFocus).focus();
}

function submitGuess () {
    console.log(`submitGuess`);
    return;
}

function getActiveFocusElementClassNum () {
    let activeFocusElementClassNum = 
        parseInt(document.activeElement.classList[0]
        .substring(document.activeElement.classList[0].length-1,
        document.activeElement.classList[0].length));
    
    console.log(`activeFocusElementClassNum: ${activeFocusElementClassNum}`);
    return activeFocusElementClassNum;
}

function isEmpty () {
    if (document.activeElement.innerHTML === ``) {
        return true;
    }
    return false;
}

function init () {
    document.querySelector(`.input-1`).focus();

    document.querySelector(`.input-area`).addEventListener(`keyup`, (event) => {
        let keyPress = event.key;
        let activeFocusNum = getActiveFocusElementClassNum();
        console.log(`activeFocusNum: ${activeFocusNum}`);
        let nextFocusNum;
        let moveFocusInput;
        if (isLetter(keyPress)) {
            if (activeFocusNum < 5) {
                nextFocusNum = activeFocusNum + 1;
                moveFocusInput = `.input-` + nextFocusNum;
                //console.log(`moveFocusInput: ${moveFocusInput}`);
                moveFocus(moveFocusInput);
            } 
        } else if (isBackSpace(keyPress)) {
            if (activeFocusNum > 1) {
                nextFocusNum = activeFocusNum - 1;
                moveFocusInput = `.input-` + nextFocusNum;
                //console.log(`moveFocusInput: ${moveFocusInput}`);
                if (isEmpty()) { 
                    moveFocus(moveFocusInput);
                }
            }
            //console.log(`pressed: ${keyPress}`);
        } else if (isEnter(keyPress)) {
            // submit word
            // move focus to next row
            console.log(`pressed: ${keyPress}`);
            submitGuess();
        }
        
    })
}
init();



