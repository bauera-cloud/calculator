// function add(num1, num2) {
//     return num1 + num2
// }

// function subtract(num1, num2) {
//     return num1 - num2
// }

// function multiply(num1, num2) {
//     return num1 * num2
// }

// function divide(num1, num2) {
//     return num1 / num2
// }

// function operate(operator, num1, num2) {
//     if (operator === '+') { return add(num1, num2) }
//     if (operator === '-') { return subtract(num1, num2) }
//     if (operator === '*') { return multiply(num1, num2) }
//     if (operator === '/') { return divide(num1, num2) }
// }

let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');
let expression = [];
let negativeNum = false;

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        let btnString = e.target.textContent
        clear(button)
        remove(button)
        validateExpression(button, btnString)
        calculate(button)
        console.log(expression)
    })
})


function validateExpression(button, btnString) {
    if (evenIndexInExpression(expression) && isNumber(button) && negativeNum) {
        expression.push('-' + btnString)
        negativeNum = false;
        addToDisplay(expression)
    }
    if (evenIndexInExpression(expression) && isNegativeBtn(button)) {
        negativeNum = true;
        display.value += '-'
    } else if (evenIndexInExpression(expression) && isNumber(button)) {
        expression.push(btnString)
        addToDisplay(expression)
    }
    if (oddIndexInExpression(expression) && isOperator(button)) {
        expression.push(btnString)
        addToDisplay(expression)
    }
}

function remove(button) {
    if (button.classList.value === 'delete-btn') {
        expression.pop()
        addToDisplay(expression)
    }
}

function clear(button) {
    if (button.classList.value === 'clear-btn') {
        display.value = '';
        expression = [];
    }
}

function calculate(button) {
    if (oddIndexInExpression(expression) && isEqualsBtn(button)) {
        let result = eval(expression.join(' '))
        display.value = result
    }
}

function addToDisplay(expression) {
    display.value = expression.join('')
}

//buttons
function isNumber(button) {
    return button.classList.contains('number')
}

function isEqualsBtn(button) {
    return button.classList.value === 'equals-btn'
}

function isOperator(button) {
    return button.classList.contains('operator')
}

function isNegativeBtn(button) {
    //negative btn node
    return button.classList.value === 'negative operator'
}

//index
function oddIndexInExpression(expression) {
    if (!expression) { return true }
    return expression.length % 2 === 1
}

function evenIndexInExpression(expression) {
    return expression.length % 2 === 0
}