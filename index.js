let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');
let clearButton = document.getElementById('clear-btn');
let deleteButton = document.getElementById('delete-btn');
let equalsButton = document.getElementById('equals-btn');

userClicksCalculatorButton();
calculatorKeyboardSupport();

function userClicksCalculatorButton() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            validateExpression(e, button);
            if (button === deleteButton && (display.value === 'Format Error' || display.value === "Can't divide by 0")) {
                clearDisplay()
            } else if (button === deleteButton) { deleteLastValue() }
            if (button === clearButton) { clearDisplay() }
            if (button === equalsButton) { calculateExpression(display) }
        })
    })
}

function calculatorKeyboardSupport() {
    display.addEventListener('keydown', (e) => {
        e.preventDefault()
        let key = e.code
        validateExpression(e)
        if (key === 'Escape') { clearDisplay() }
        if (key === 'Backspace' && /[A-Za-z]/g.test(display.value)) {
            clearDisplay()
        } else if (key === 'Backspace') { deleteLastValue() }
        if (key === 'Enter' || (key === 'Equal' && e.shiftKey === false)) { calculateExpression(display) }
    })
}

function validateExpression(e, button) {
    let userClicksCalculator = e.type === 'click';
    let userTypesCalculation = e.type === 'keydown';
    if (userClicksCalculator) { validateButtonsClicked(e, button) }
    if (userTypesCalculation) { validateKeysPressed(e) }
}

function validateButtonsClicked(e, button) {
    let lastValue = display.value[display.value.length - 1];
    let secondToLastValue = display.value[display.value.length - 2];

    let buttonString = e.target.textContent;
    let number = button.classList.contains('number');
    let decimal = button.classList.contains('decimal');
    let operator = button.classList.contains('operator');
    let negative = button.classList.value === 'negative operator';


    //if there's no display string and user clicks negative, number, or decimal button. addToDisplay
    if (lastValue === undefined && (negative || number || decimal)) { addToDisplay(buttonString) }

    //'-' can add (4) or .
    if (isNegative(lastValue) && (number || decimal)) {
        addToDisplay(buttonString)
        //changes '6-*' tp '6*'
    } else if (isNegative(lastValue) && secondToLastValue && operator) {
        display.value = display.value.replace(/.$/, buttonString)
    }
    //changes '5+-' to '5-'
    if (isPositiveOperator(lastValue) && negative) {
        display.value = display.value.replace(/.$/, "-");
    } else if (isOperator(lastValue) && !isNegative(lastValue) && (number || decimal || negative)) {
        addToDisplay(buttonString)
    }

    //won't allow 1.1.1. Plus if '...3' can add ('1') or ('/')
    if ((isNumber(lastValue) && decimal && !isDecimalInNumber(getLastNumber())) || (isNumber(lastValue) && (number || operator))) {
        addToDisplay(buttonString)
    }

    if (isDecimal(lastValue) && (number || operator)) { addToDisplay(buttonString) }
}

function validateKeysPressed(e) {
    let lastValue = display.value[display.value.length - 1];
    let secondToLastValue = display.value[display.value.length - 2];

    let key = e.key
    let number = /Digit/g.test(e.code);
    let decimal = key === '.';
    let negative = key === '-'
    let operator = isOperator(key);

    //if there's no display string and user clicks negative, number, or decimal button. addToDisplay
    if (lastValue === undefined && ((negative || decimal) || (number && e.shiftKey === false))) { addToDisplay(key) }

    //'-' can add (4) or .
    if (isNegative(lastValue) && ((number && e.shiftKey === false) || decimal)) {
        addToDisplay(key)
        //changes '6-*' tp '6*'
    } else if (isNegative(lastValue) && secondToLastValue && operator) {
        display.value = display.value.replace(/.$/, key)
    }
    //changes '5+-' to '5-'
    if (isPositiveOperator(lastValue) && negative) {
        display.value = display.value.replace(/.$/, "-");
        // allows 6*3, 6*-, or 6*.
    } else if (isOperator(lastValue) && !isNegative(lastValue) && ((number && e.shiftKey === false) || decimal || negative)) {
        addToDisplay(key)
    }

    //won't allow 1.1.1. Plus if '...3' can add ('1') or ('/')
    if ((isNumber(lastValue) && decimal && !isDecimalInNumber(getLastNumber())) || (isNumber(lastValue) && (number || operator))) {
        addToDisplay(key)
    }

    if (isDecimal(lastValue) && (number || operator)) { addToDisplay(key) }
}

function calculateExpression(display) {
    let result;
    let expression = convertDisplayToArr(display.value);
    if (expression) {
        result = calcUsingOrderOfOperations(expression);
        display.value = result
    }
}


function convertDisplayToArr(expressionStr) {
    let expressionArr = expressionStr.match(/[-\+\*\/]|\d*\.\d*|\d+/g);
    //match() turns '11+2-.1*2/7' to ['11', '+', '2', '-', '.1', '*', '2', '/', '7']
    expressionArr.forEach((item, i) => {
        if (isNumber(item) && isNegative(expressionArr[i - 1]) && isOperator(expressionArr[i - 2])) {
            expressionArr[i] = '-' + item;
            expressionArr.splice(i - 1, 1);
        } else if (isNumber(item) && isNegative(expressionArr[i - 1]) && expressionArr[i - 2] === undefined) {
            expressionArr[i] = '-' + item;
            expressionArr.splice(i - 1, 1);
        }
    })
    //temporary fix for '-' operators. Identifies negative numbers. Ideally will change regex.
    //fixes '-6*-3-7' to be ['-6', '*', '-3', '-', '7']
    return expressionArr
}

//6*-3 doesn't work.
function calcUsingOrderOfOperations(expressionArr) {
    if (divideByZero(expressionArr)) {
        turnErrorMessageRed()
        return "Can't divide by 0"
    }
    if (hasWrongFormat(expressionArr)) {
        turnErrorMessageRed()
        return 'Format Error'
    }
    let lastItemInExpression = expressionArr[expressionArr.length - 1];
    if (isOperator(lastItemInExpression) && expressionArr.length >= 3) {
        expressionArr.pop()
    } else if (isOperator(lastItemInExpression)) {
        return expressionArr.join('')
    }
    //while arr isn't [24] for example. Calculate.
    while (expressionArr.length > 1) {
        let smallExpression;
        let operatorIndex;

        //while the large expression has a '*' operator. Find small extract small expression from it, calculate it, return a string result. 
        while (expressionArr.includes('*')) {
            operatorIndex = expressionArr.indexOf('*') // returns first * index. PEMDAS works from left to right.
            //get small expression array with multiplication operator
            smallExpression = expressionArr.slice(operatorIndex - 1, operatorIndex + 3)
            //mutate expressionArr, replace '4', '*', '6' with '24'
            expressionArr.splice(operatorIndex - 1, 3, calcSmallExpression(smallExpression)) //returns '24')
            //returns ['9', '+', '4', '/', '24, '-', '1', '*', '2']
        }
        while (expressionArr.includes('/')) {
            operatorIndex = expressionArr.indexOf('/')
            smallExpression = expressionArr.slice(operatorIndex - 1, operatorIndex + 3)
            expressionArr.splice(operatorIndex - 1, 3, calcSmallExpression(smallExpression))
        }
        while (expressionArr.includes('+')) {
            operatorIndex = expressionArr.indexOf('+')
            smallExpression = expressionArr.slice(operatorIndex - 1, operatorIndex + 3)
            expressionArr.splice(operatorIndex - 1, 3, calcSmallExpression(smallExpression))
        }
        while (expressionArr.includes('-')) {
            operatorIndex = expressionArr.indexOf('-')
            smallExpression = expressionArr.slice(operatorIndex - 1, operatorIndex + 3)
            expressionArr.splice(operatorIndex - 1, 3, calcSmallExpression(smallExpression))
        }
    }
    if (isDecimalInNumber(expressionArr) && expressionArr.toString().length > 3) {
        return Number(expressionArr).toFixed(2).toString()
    } else {
        return expressionArr.join('')
    }
}

function calcSmallExpression(smallExpressionArr) {
    let [num1, operator, num2] = smallExpressionArr;
    num1 = Number(num1); num2 = Number(num2);
    switch (operator) {
        case '+': return add(num1, num2).toString()
        case '-': return subtract(num1, num2).toString()
        case '*': return multiply(num1, num2).toString()
        case '/': return divide(num1, num2).toString()
    }
}

function getLastNumber() {
    let matchOperator = display.value.match(/[\*\+/-]/gi);
    let lastIndexOfOperator = matchOperator ? display.value.lastIndexOf(matchOperator[matchOperator.length - 1]) : 0;
    let lastNumber = lastIndexOfOperator === 0 ? display.value.slice(0) : display.value.slice(lastIndexOfOperator + 1);
    return lastNumber
}

function clearDisplay() {
    display.classList.remove('red');
    display.value = '';
}

function deleteLastValue() {
    display.value = display.value.replace(/.$/, '')
}

//Error messages
function turnErrorMessageRed() {
    display.classList.add('red');
}

function divideByZero(expressionArr) {
    return expressionArr.includes('0') && expressionArr[expressionArr.indexOf('0') - 1] === '/'
}

function hasWrongFormat(expressionArr) {
    return expressionArr.includes('.')
}

function isDecimalInNumber(lastNumber) {
    return /\./g.test(lastNumber)
}

function isOperator(lastValue) {
    return new RegExp('[\*\+/-]$').test(lastValue)
}

function isNumber(lastValue) {
    return /\d/.test(lastValue)
}

function isDecimal(lastValue) {
    return /\./.test(lastValue);
}

function isPositiveOperator(lastValue) {
    return /\+/.test(lastValue)
}

function isNegative(lastValue) {
    return /\-/.test(lastValue)
}

function addToDisplay(stringValue) {
    return display.value += stringValue;
}

function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}