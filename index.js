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
        // if (button === deleteButton) { deletePrevValue(display.value, prevValue) }

        if (lastValue === undefined && (negative || number || decimal)) {
            addToDisplay(buttonString)
        }
        if (isNegative(lastValue) && (number || decimal)) {
            addToDisplay(buttonString)
        } else if (isNegative(lastValue) && operator) {
            display.value = display.value.replace(/.$/, buttonString)
        }
        if (isPositiveOperator(lastValue) && negative) {
            display.value = display.value.replace(/.$/, "-");
        } else if (isOperator(lastValue) && !isNegative(lastValue) && (number || decimal || negative)) {
            addToDisplay(buttonString)
        }
        if ((isNumber(lastValue) && decimal && !isDecimalInNumber(getLastNumber())) || (isNumber(lastValue) && (number || operator))) {
            addToDisplay(buttonString)
        }
        if (isDecimal(lastValue) && (number || operator)) {
            addToDisplay(buttonString)
        }

    })
})


function getLastNumber() {
    matchOperator = display.value.match(/[\*\+/-]/gi);
    lastIndexOfOperator = matchOperator ? display.value.lastIndexOf(matchOperator[matchOperator.length - 1]) : 0;
    lastNumber = lastIndexOfOperator === 0 ? display.value.slice(0) : display.value.slice(lastIndexOfOperator + 1);
    return lastNumber
}

function isDecimalInNumber(lastNumber) {
    return /\./g.test(lastNumber)
}

function deletePrevValue(display, prevValue) {
    if (display) {
        return display.replace(prevValue, '')
    } else {
        return display
    }
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





