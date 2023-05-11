let number;
let operator;
let number2;

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

function operate(num1, operator, num2) {
    if(operator === '+') { return add(num1, num2)}
    if(operator === '-') { return subtract(num1, num2)}
    if(operator === '*') { return multiply(num1, num2)}
    if(operator === '/') { return divide(num1,num2)}
}

//I want the array to be in the same order
//I want an array of 3 elements for each operation
//I want the numbers to be converted to typeof 'number'


// converts '12+1' to [12, '+', 1]
function convertExpressToArr(string) {
    let operator = string.split('').find((value) => !parseInt(value))
    let indexOfOperator = string.indexOf(operator)
    let num1 = Number(string.slice(0, indexOfOperator))
    let num2 = Number(string.slice(indexOfOperator + 1))
    return [num1, operator, num2]
}

//subproblem: more than 2 numbers - '12+12+12'

//subproblem: identifying operators - '12-12+12'

//subproblem: using previous result after '=' to add to
//the next set of numbers






let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');
let result;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let btn = button.classList.value;
        if (btn === 'clear') { return display.value = '';} 
        else if ((btn === 'equals') && display.value.length >= 3) {
            result = String(operate(...convertExpressToArr(display.value)));
            display.value = result
        }else {
            display.value += e.target.textContent
        }
    })
})


/* Plan
    get operations working:
        operations without equals should have a separate
            result display below the expression display
        '=' should clear display. Then add result to display

    equals sign shouldn't be added to display
    make the clear function working
*/ 

//Understand the problem:

//Pseudocode:

//receive input from button
//change display to include numbers and operator
//when '=' button is selected, clear display
//change number values in expression from display to numbers
//run operate function to get result
//change result to a string
//change display to equal result

