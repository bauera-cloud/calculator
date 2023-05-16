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

let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');
let numbers = Array.from(buttons).filter((button) => button.textContent)
console.log(numbers)


let result;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        let btn = button.classList.value;
        preventNonDisplayableButtons(btn, e)
        if (isClearBtn(btn)) display.value = '';
        if (isDeleteBtn(btn)) { display.value = deletePrevValue(display.value) }
        //                   && isValidExpression(string)
        if (isEqualsBtn(btn) && display.value.length >= 3) {
            result = String(operate(...convertExpressToArr(display.value)).toFixed(1));
            display.value = result
        }
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

function isNegativeBtn(btn) {
    return btn === 'negative-btn'
}

function deletePrevValue(display) {
    if (display) {
        let prevValue = display[display.length - 1]
        return display.replace(prevValue, '')
    } else {
        return display
    }
}

function preventNonDisplayableButtons(btn, e) {
    if (!isClearBtn(btn) && !isDeleteBtn(btn) && !isEqualsBtn(btn)) {
        display.value += e.target.textContent
    }
}