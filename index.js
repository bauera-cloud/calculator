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

function operate(operator, num1, num2) {
    if (operator === '+') { return add(num1, num2) }
    if (operator === '-') { return subtract(num1, num2) }
    if (operator === '*') { return multiply(num1, num2) }
    if (operator === '/') { return divide(num1, num2) }
}

// converts '12+1' to [12, '+', 1]
function convertExpressToArr(str) {
    let operator = str.split('').find((value) => !parseInt(value) && value !== '.')
    let num1 = Number(str.slice(0, str.indexOf(operator)))
    let num2 = Number(str.slice(str.indexOf(operator) + 1))
    return [operator, num1, num2]
}

//Plan: simplify addEventListener fn by adding other
//functions for their own individual tasks. In addition,
//allow each function to be readable in English.

//subproblems:
//  operator can only be 2nd in position of the string
//  display error message if user tries to divide by 0
//  disable the decimal button if there's already one in the display or get 12.2.3.1
//  user is able to click display operator at any
//position in the display. Only negative button should work





let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');
let result;
let expression = display.value

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let btn = button.classList.value;
        if (!isClearBtn(btn) && !isDeleteBtn(btn) && !isEqualsBtn(btn)) {
            display.value += e.target.textContent
        }
        if (isClearBtn(btn)) display.value = '';
        if (isDeleteBtn(btn)) { display.value = deletePrevValue(display.value) }
        //                   && isValidExpression(string)
        if (isEqualsBtn(btn) && display.value.length >= 3) {
            result = String(operate(...convertExpressToArr(display.value)).toFixed(1));
            display.value = result
        }
        // if(isValidExpression()) {
        // result = operate()
        // displayResult(result)
        // }
    })
})

function isClearBtn(btn) {
    return btn === 'clear-btn'
}

function isEqualsBtn(btn) {
    return btn === 'equals-btn'
}

function isDeleteBtn(btn) {
    return btn === 'delete-btn'
}

function deletePrevValue(display) {
    if (display) {
        let prevValue = display[display.length - 1]
        return display.replace(prevValue, '')
    } else {
        return display
    }
}


//if there's a number before the operator and a number after
//the operator it is a valid expression: return true: 
//else false

//checks to see if string from user is in the right order
//before changing the values into numbers or operators
function isValidExpression() {

}
// console.log(isValidExpression('12+2'))











//Other subproblems I don't have to fix...

//subproblem: more than 2 numbers - '12+12+12'
//subproblem: identifying operators - '12-12+12'
//subproblem: using previous result after '=' to add to
//the next set of numbers and use on other display