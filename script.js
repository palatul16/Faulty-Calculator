const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let currentInput = '';
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value === '=') {
            calculateResult();
        } else if (value === 'C') {
            currentInput = '';
            display.value = '';
        }
        else if (['+', '-', '*', '/'].includes(value)) {
            currentInput += ` ${value} `;
        } else {
            currentInput += value;
        }
        display.value = currentInput;
    });
});
function calculateResult() {
    try {
        const isFaulty = Math.random() < 0.25;
        let result = eval(currentInput);
        if (isFaulty) {
            console.log('Faulty behavior triggered!');
            result = applyFaultyLogic(currentInput);
        }
        display.value = result;
        currentInput = result.toString();
    } catch (error) {
        display.value = 'Error';
        currentInput = '';
    }
}
function applyFaultyLogic(input) {
    const faultyMapping = {
        '+': '*',
        '-': '/',
        '*': '+',
        '/': '-',
    };
    const tokens = input.split(' ');
    for (let i = 0; i < tokens.length; i++) {
        if (faultyMapping[tokens[i]]) {
            tokens[i] = faultyMapping[tokens[i]];
        }
    }
    return eval(tokens.join(' '));
}

