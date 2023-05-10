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

function operate(operator, num1, num2) {
    if(operator === '+') { 
        add(num1, num2)
    }
}
operate('+', '9.2', '3')

let display = document.querySelector('.display');

let clearSymbol = document.querySelector('.clear');
console.dir(display)

let buttons = document.querySelectorAll('button');

//Array.from(buttons)
// let numbers = buttons.filter((button) => button.classList.value === 'number');
// let operators = buttons.filter((button) => button.classList.value === "operator");

let operators = [];
let numbers = [];
buttons.forEach((button) => {
    // if (button.classList.value === 'number') { numbers.push(button) }
    // if (button.classList.value === "operator") { operators.push(button) }
    button.addEventListener('click', (e) => {
        if (button.classList.value === 'clear') {
            display.value = '';
        } else {
            display.value += e.target.textContent
        }
    })
})

function clear() {
    display.value = '';
}

console.log('2+2'.split('').find((el) => { el === '+'}))

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