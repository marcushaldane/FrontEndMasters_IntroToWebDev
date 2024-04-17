

console.log(`hello world`);


let userInputString = "";

// querySelecter targets `my-calc` div which contains all buttons of the calculator and the result bar on top
// addEventListener waits for a click on one of the buttons in the `my-calc` div and handles userInput function calls
document.querySelector(`.my-calc`).addEventListener(`click`, function(){
    console.log(`clicked ${event.target.innerText}`);
    constructUserInputString(event.target.innerText, event.target.classList);
}); 

function constructUserInputString (userCharacter, userCharacterClassList) {
    if(userCharacterClassList.contains(`calc-clear`)) {
        userInputString = ""; // reset userInputString to empty string
        //Not needed because of same function call at bottom of this function//populateResultPtag(""); // sets innerText of result <p> tag to empty string
    } else if (userCharacterClassList.contains(`calc-back`)) {
        userInputString = userInputString.substring(0, userInputString.length - 1); // pop last element off of userInputString
    } else if(userCharacterClassList.contains(`math-op`)) {
        console.log(userCharacterClassList);
        switch(userCharacterClassList[0]) {
            case `calc-divide`:
                userInputString += `/`;
                break;
            case `calc-multiply`:
                userInputString += `*`;
                break;
            case `calc-subtract`:
                userInputString += `-`;
                break;
            case `calc-add`:
                userInputString += `+`;
                break;
            case `calc-equals`:
                parseUserInput();        
                //userInputString += `=`;
                break;
            default:
                userInputString += `error`;    
        }
    } else {
        userInputString += userCharacter;
    }
    //console.log(`userInputString: `.concat(userInputString));
    populateResultPtag(userInputString);
};

function populateResultPtag (resultInnerTextValue) {
    const resultBox = document.querySelector(`.calc-result`);
    resultBox.innerText = resultInnerTextValue;
};

function parseUserInput () {
    //userInputString = `Testing`;
    let x = 0;
    let xString = ``;
    let y = 0;
    let yString = ``;
    let opString = ``;
    for (let i = 0; i < userInputString.length; i++) {
        //console.log(`in for loop; `.concat(parseInt(userInputString[i])));
        //console.log(`x: `.concat(x).concat(`\ny: `).concat(y))
        //console.log(`userInputString[i]: `.concat(userInputString[i]));
        if(isNaN(parseInt(userInputString[i]))) {
            //console.log(`NaN Found`);
            opString = userInputString[i];
            x =- 1;
        } else if (x == 0) {
            xString = xString.concat(userInputString[i]);
            //console.log(`xString: `.concat(xString).concat(`?`));
        } else {
            yString = yString.concat(userInputString[i]);
        }
    }
    //console.log(`xString: `.concat(xString).concat(`\nyString: `).concat(yString))
    x = parseInt(xString);
    y = parseInt(yString);
    //console.log(`x: `.concat(x).concat(`\ny: `).concat(y))

    switch(opString) {
        case `/`:
            userInputString = doDivide(x,y).toString();
            break;
        case `*`:
            userInputString = doMultiply(x,y).toString();
            break;
        case `-`:
            userInputString = doSubtract(x,y).toString();
            break;
        case `+`:
            userInputString = doAdd(x,y).toString();
            break;
    }
};

function doDivide(x,y) {
    return (x/y);
};
function doMultiply(x,y) {
    return (x*y);
};
function doSubtract(x,y) {
    return (x-y);
};
function doAdd(x,y) {
    return (x+y);
};