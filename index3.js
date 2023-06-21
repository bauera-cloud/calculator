//once there's an array of operands and operators
//calcUsingOrderOfOperations() replaces eval()

let expressionArr = ['9', '+', '4', '/', '4', '*', '6', '-', '1', '*', '2'];

console.log(calcUsingOrderOfOperations(expressionArr))

function calcUsingOrderOfOperations(expressionArr) {
    while (expressionArr.length > 1) {
        let smallExpression;
        let operatorIndex;

        while (expressionArr.includes('*')) {
            operatorIndex = expressionArr.indexOf('*') // returns first * index
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
            //returns ['9.016', '-', '1']
        }
        while (expressionArr.includes('-')) {
            operatorIndex = expressionArr.indexOf('-')
            smallExpression = expressionArr.slice(operatorIndex - 1, operatorIndex + 3)
            expressionArr.splice(operatorIndex - 1, 3, calcResult(smallExpression))
        }
    }
    return expressionArr.toString()
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