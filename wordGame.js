function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function moveFocus(nextFocus) {
    document.querySelector(nextFocus).focus();
}

function getActiveFocus() {
    let inputClassNum = document.activeElement.classList[0];
    console.log(`inputClassNum: ${inputClassNum}`);

    let currentFocusNum = parseInt(inputClassNum.substring(inputClassNum.length-1,inputClassNum.length));
    console.log(`currentFocusNum: ${currentFocusNum}`);
    
    let nextFocusNum;
    if(currentFocusNum < 5) {
        nextFocusNum = currentFocusNum + 1;
    } else {
        nextFocusNum = 1;
    }

    let moveFocusInput = `.input-` + nextFocusNum;
    console.log(`moveFocusInput: ${moveFocusInput}`);
    moveFocus(moveFocusInput);

    // let timeout;
    // timeout = setTimeout(moveFocus(moveFocusInput), 1000);
}

function init () {
    document.querySelector(`.input-1`).focus();
    // for ( let i = 0; i < 100; i++ ) {
    //     getActiveFocus();
    // }
    document.querySelector(`.input-area`).addEventListener(`keyup`, () => {
        getActiveFocus();
    })
}
init();



