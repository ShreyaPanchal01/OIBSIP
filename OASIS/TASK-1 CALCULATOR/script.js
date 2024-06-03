const screen = document.getElementById('screen');

function appendNumber(number) {
    screen.value += number;
}

function appendOperator(operator) {
    screen.value += ` ${operator} `;
}

function clearScreen() {
    screen.value = '';
}

function deleteLast() {
    screen.value = screen.value.slice(0, -1);
}

function calculate() {
    try {
        screen.value = eval(screen.value.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100'));
    } catch {
        screen.value = 'Error';
    }
}
