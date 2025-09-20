// This file contains the JavaScript logic for the calculator. It handles user input, performs arithmetic operations, updates the display in real-time, and includes functionality for clearing the screen and keyboard support.

const display = document.getElementById('display');
let currentInput = '';
let operator = '';
let firstOperand = null;

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function chooseOperator(op) {
    if (currentInput === '') return;
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        firstOperand = operate(operator, firstOperand, parseFloat(currentInput));
    }
    operator = op;
    currentInput = '';
}

function operate(op, a, b) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return b;
    }
}

function calculate() {
    if (firstOperand === null || currentInput === '') return;
    currentInput = operate(operator, firstOperand, parseFloat(currentInput)).toString();
    operator = '';
    firstOperand = null;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.innerText));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => chooseOperator(button.innerText));
});

document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearDisplay);

document.addEventListener('keydown', (event) => {
    if (!isNaN(event.key)) {
        appendNumber(event.key);
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        chooseOperator(event.key);
    } else if (event.key === 'Enter') {
        calculate();
    } else if (event.key === 'Escape') {
        clearDisplay();
    }
});