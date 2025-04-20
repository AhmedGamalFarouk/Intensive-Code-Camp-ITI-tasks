
let firstNumber = null;
let secondNumber = null;
let operator = null;
let operatorEntered = false;

function EnterNumber(value) {
    const answerField = document.getElementById("Answer");

    if (operatorEntered) {
        answerField.value += value;
        operatorEntered = false;
    } else {
        answerField.value += value;
    }
}

function EnterOperator(op) {
    const answerField = document.getElementById("Answer");

    if (firstNumber === null) {
        firstNumber = parseFloat(answerField.value);
    }

    operator = op;
    operatorEntered = true;
    answerField.value += op;
}

function EnterEqual() {
    const answerField = document.getElementById("Answer");
    const expression = answerField.value;


    let secondNumberStr = "";
    let foundOperator = false;

    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '+' || expression[i] === '-' ||
            expression[i] === '*' || expression[i] === '/') {
            foundOperator = true;
            continue;
        }

        if (foundOperator) {
            secondNumberStr += expression[i];
        }
    }

    secondNumber = parseFloat(secondNumberStr);
    let result;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    } else if (operator === "-") {
        result = firstNumber - secondNumber;
    } else if (operator === "*") {
        result = firstNumber * secondNumber;
    } else if (operator === "/") {
        result = firstNumber / secondNumber;
    }

    answerField.value = result;

}

function EnterClear() {
    const answerField = document.getElementById("Answer");
    answerField.value = "";
    firstNumber = null;
    secondNumber = null;
    operator = null;
    operatorEntered = false;
}