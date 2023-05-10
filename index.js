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
}
//work with static values. simplest form first.
//problem: using a string '2+2'...how can I insert the
//numbers and operator into the operate function?

//I want the array to be in the same order
//I want an array of 3 elements for each operation
//I want the numbers to be converted to typeof 'number'


//subproblem: convert '12+1' into 12 '+' 1
function convertExpressToArr(string) {
    let indexOfOperator = string.indexOf('+')
    let operator = string.split('').find((value) => value === '+')
    let num1 = Number(string.slice(0, indexOfOperator))
    let num2 = Number(string.slice(indexOfOperator + 1))
    return [num1, operator, num2]
}
// console.log(twoPointO('12+1'))
console.log(operate(...convertExpressToArr('2+2')))

//convert '12+' to a number










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


// Get operations working
//2 + 2 = 4 working first.

//Understand the problem:

//Pseudocode:

//receive input from button
//change display to include numbers and operator
//when '=' button is selected, clear display
//change number values in expression from display to numbers
//run operate function to get result
//change result to a string
//change display to equal result

//num1operatornum2.split('')

//multiple numbers: ex: 99 - 
//whatever is in the input before 'operator' is num1 
//for the function

//numbers should be converted to a number type before added
//to the operator function
//


///display.textContent = String(operate('+', 2, 2))