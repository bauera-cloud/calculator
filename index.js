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

/* Plan
    equals sign shouldn't be added to display
*/

//subproblems:
//  pressing '=' before entering all of the numbers causes a problem.
//  display error message if user tries to divide by 0
//  disable the decimal button if there's already one in the display or get 12.2.3.1
//  change the calculator design with CSS
//  add a backspace button to undo a number




let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');
let result;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let btn = button.classList.value;
        if (btn === 'clear') { return display.value = ''; }
        else if ((btn === 'equals') && display.value.length >= 3) {
            result = String(operate(...convertExpressToArr(display.value)).toFixed(2));
            display.value = result
        } else {
            display.value += e.target.textContent
        }
    })
})



//Subproblems I don't have to fix...

//subproblem: more than 2 numbers - '12+12+12'
//subproblem: identifying operators - '12-12+12'
//subproblem: using previous result after '=' to add to
//the next set of numbers and use on other display