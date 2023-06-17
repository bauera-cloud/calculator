let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');
let expression = [];
let negativeNum = false;

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        console.log(expression)
        let btnString = e.target.textContent
        clear(button)
        remove(button)
        validateExpression(button, btnString)
        calculate(button)
        console.log(expression)
    })
})


function validateExpression(button, btnString) {
    let negativeBtn = button.classList.value === 'negative operator'
    let decimalBtn = button.classList.contains('decimal');
    let operatorBtn = button.classList.contains('operator')
    let numberBtn = button.classList.contains('number');
    // let oddIndexInExpression = expression.length % 2 === 1;
    // let evenIndexInExpression = expression.length % 2 === 0;
    let lastItemInExpression = expression[expression.length - 1];
    let lastValueInLastItem = lastItemInExpression.slice(-1);

    if ((!expression.length || isOperator(lastItemInExpression)) && (decimalBtn || negativeBtn || numberBtn)) {
        expression.push(btnString)
        addToDisplay(expression)
    }
    if (isNumber(lastValueInLastItem) && (numberBtn || decimalBtn)) {
        lastValueInLastItem + btnString
    }
    if (isDecimal(lastValueInLastItem) && numberBtn) {
        lastValueInLastItem + btnString
    }
    if (isNegative(lastValueInLastItem) && (numberBtn || decimalBtn)) {
        lastValueInLastItem + btnString
    }


    // if (oddIndexInExpression && operatorBtn) {
    //     expression.push(btnString)
    //     addToDisplay(expression)
    // }
}

function divideByZero() {
    let oddIndexInExpression = expression.length % 2 === 1;
    let equalsBtn = document.querySelector('.equals-btn');
    let lastOperator = expression[expression.length - 2]
    let lastItemInExpression = expression[expression.length - 1]
    if (oddIndexInExpression && equalsBtn && lastOperator === '/' && lastItemInExpression === '0') {
        return true
    } else {
        return false
    }
}

function remove(button) {
    let deleteBtn = button.classList.value === 'delete-btn'
    if (deleteBtn) {
        expression.pop()
        addToDisplay(expression)
    }
}

function clear(button) {
    let clearBtn = button.classList.value === 'clear-btn';
    if (clearBtn) {
        expression = [];
        addToDisplay(expression)
    }
}

function addToDisplay(expression) {
    display.value = expression.join('')
}

function calculate(button) {
    let oddIndexInExpression = expression.length % 2 === 1;
    let equalsBtn = button.classList.value === 'equals-btn';
    if (divideByZero()) {
        display.value = "Can't divide by 0";
    } else if (oddIndexInExpression && equalsBtn) {
        let result = eval(expression.join(' '))
        display.value = result
    }
}

function isOperator(item) {
    return /[\*\/+-]/g.test(item)
}

function isNumber(item) {
    return /[0-9]/g.test(item)
}

function isNegative(item) {
    return /-/g.test(item)
}

function isDecimal(item) {
    return /\./g.test(item)
}