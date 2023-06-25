let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');
let clearButton = document.getElementById('clear-btn');
let deleteButton = document.getElementById('delete-btn');
let lastValue;

let matchOperator;
let lastIndexOfOperator;
let lastNumber;


//make the delete button work without adding it to the display

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        lastValue = display.value[display.value.length - 1];

        let buttonString = e.target.textContent;
        let number = button.classList.contains('number');
        let decimal = button.classList.contains('decimal');
        let operator = button.classList.contains('operator');
        let negative = button.classList.value === 'negative operator';

        if (button === clearButton) { display.value = ''; }

        //if there's no display string and user clicks negative, number, or decimal button. addToDisplay
        if (lastValue === undefined && (negative || number || decimal)) { addToDisplay(buttonString) }

        //'-' can add (4) or .
        if (isNegative(lastValue) && (number || decimal)) {
            addToDisplay(buttonString)
            //changes '6-*' tp '6*'
        } else if (isNegative(lastValue) && operator) {
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
    })
})

//-11 doesn't work. If the beginning number is a negative number.
function convertDisplayToArr(expressionStr) {
    //turns '11+2-.1*2/7' to ['11', '+', '2', '-', '.1', '*', '2', '/', '7']
    return expressionStr.match(/[-\+\*\/]|\d*\.\d+|\d+|-\d+/g);
}

function calcUsingOrderOfOperations(expressionArr) {
    //while arr isn't [24] for example.
    while (expressionArr.length > 1) {
        let smallExpression;
        let operatorIndex;

        //while the large expression has a '*' operator. Find small extract small expression from it, calculate it, return a string result. 
        while (expressionArr.includes('*')) {
            operatorIndex = expressionArr.indexOf('*') // returns first * index. PEMDAS works from left to right.
            //get small expression array with multiplication operator
            smallExpression = expressionArr.slice(operatorIndex - 1, operatorIndex + 3)
            //mutate expressionArr, replace '4', '*', '6' with '24'
            expressionArr.splice(operatorIndex - 1, 3, calcResult(smallExpression)) //returns '24')
            //returns ['9', '+', '4', '/', '24, '-', '1', '*', '2']
        }
        while (expressionArr.includes('/')) {
            operatorIndex = expressionArr.indexOf('/')
            smallExpression = expressionArr.slice(operatorIndex - 1, operatorIndex + 3)
            expressionArr.splice(operatorIndex - 1, 3, calcResult(smallExpression))
        }
        while (expressionArr.includes('+')) {
            operatorIndex = expressionArr.indexOf('+')
            smallExpression = expressionArr.slice(operatorIndex - 1, operatorIndex + 3)
            expressionArr.splice(operatorIndex - 1, 3, calcResult(smallExpression))
        }
        while (expressionArr.includes('-')) {
            operatorIndex = expressionArr.indexOf('-')
            smallExpression = expressionArr.slice(operatorIndex - 1, operatorIndex + 3)
            expressionArr.splice(operatorIndex - 1, 3, calcResult(smallExpression))
        }
    }
    return Number(expressionArr).toFixed(2).toString()
}

function calcResult(smallExpressionArr) {
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
    matchOperator = display.value.match(/[\*\+/-]/gi);
    lastIndexOfOperator = matchOperator ? display.value.lastIndexOf(matchOperator[matchOperator.length - 1]) : 0;
    lastNumber = lastIndexOfOperator === 0 ? display.value.slice(0) : display.value.slice(lastIndexOfOperator + 1);
    return lastNumber
}

function isDecimalInNumber(lastNumber) {
    return /\./g.test(lastNumber)
}

function isOperator(lastValue) {
    return new RegExp('[\*\+/-]').test(lastValue)
}

function isNumber(lastValue) {
    return /[\d]/.test(lastValue)
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

function addToDisplay(buttonString) {
    return display.value += buttonString;
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

//delete button function. Not working.
// function deletePrevValue(display, prevValue) {
//     if (display) {
//         return display.replace(prevValue, '')
//     } else {
//         return display
//     }
// }



