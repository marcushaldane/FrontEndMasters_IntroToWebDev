// userInputString variable is used to populate result <p> tag and used to parse and calculate results of user input 
let userInputString = ``;

// querySelecter targets `my-calc` div which contains all buttons of the calculator and the result bar on top
// addEventListener waits for a click on one of the buttons in the `my-calc` div and handles userInput function calls
document.querySelector(`.my-calc`).addEventListener(`click`, function() {
    constructUserInputString(event.target.innerText, event.target.classList);
}); 

/*
The constructUserInputString function is called when button click happens and either 
clears userInputString and result <p> tag, 
removes a char from userInputString when back button is pressed,
or adds button char value to the userInputString.
Also calls populateResultPtag function to update result <p> tag at the end of the function.
*/
function constructUserInputString (userCharacter, userCharacterClassList) {
    if(userCharacterClassList.contains(`calc-clear`)) {
        userInputString = ""; // reset userInputString to empty string
    } else if (userCharacterClassList.contains(`calc-back`)) {
        userInputString = userInputString.substring(0, userInputString.length - 1); // pop last element off of userInputString
    } else if(userCharacterClassList.contains(`math-op`)) {
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
                break;
            default:
                userInputString += `error`;    
        }
    } else {
        userInputString += userCharacter;
    }
    populateResultPtag(userInputString);
};


/*
The populateResultPtag function uses document.querySelector to 
get the result <p> tag based on the class name and 
sets the innerText value of that <p> tag to 
whatever is passed into the function as the resultInnerTextValue variable.
*/
function populateResultPtag (resultInnerTextValue) {
    const resultBox = document.querySelector(`.calc-result`);
    resultBox.innerText = resultInnerTextValue;
};

/*
The parseUserInput function is called when the = button is pressed.
The function parses the userInputString and attempts to break that string into an x, y and operation values 
so that a result of some mathematical expression can be calculated and used to set the result <p> tag (userInputString)
*/
function parseUserInput () {
    let x = 0, y = 0;
    let xString = ``, yString = ``, opString = ``;
    let negateX = false, checkFirstUIS = true;
    for (let i = 0; i < userInputString.length; i++) {
        if(checkFirstUIS && userInputString[0] == `-`) {
            negateX = true;
            checkFirstUIS = false;
            continue;
        }
        if(isNaN(parseInt(userInputString[i]))) {
            opString = userInputString[i];
            x =- 1;
        } else if (x == 0) {
            xString = xString.concat(userInputString[i]);
        } else {
            yString = yString.concat(userInputString[i]);
        }
    }
    x = parseInt(xString);
    y = parseInt(yString);
    if(negateX) {x *= -1};

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

/* 
Trivial functions
*/
function doDivide(x, y) {
    return (x / y);
};
function doMultiply(x, y) {
    return (x * y);
};
function doSubtract(x, y) {
    return (x - y);
};
function doAdd(x, y) {
    return (x + y);
};