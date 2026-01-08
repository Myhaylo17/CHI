const data = {
    num1: null,
    num2: null,
    operator: null
};

const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operatorInput = document.getElementById('operator');

num1Input.addEventListener('blur', () => {
    data.num1 = num1Input.value;
});

num2Input.addEventListener('blur', () => {
    data.num2 = num2Input.value;
});

operatorInput.addEventListener('blur', () => {
    data.operator = operatorInput.value;
});

function addValue(value) {
    if (operatorInput.value === '') {
        num1Input.value += value;
        data.num1 = num1Input.value;
    } else {
        num2Input.value += value;
        data.num2 = num2Input.value;
    }
}

function setOperator(op) {
    operatorInput.value = op;
    data.operator = op;
}

function clearAll() {
    num1Input.value = '';
    num2Input.value = '';
    operatorInput.value = '';
    data.num1 = null;
    data.num2 = null;
    data.operator = null;
}

function calculate() {
    if (
        data.num1 === null || data.num1 === '' ||
        data.num2 === null || data.num2 === '' ||
        data.operator === null || data.operator === ''
    ) {
        alert('Будь ласка, введіть обидва числа та операцію');
        return;
    }

    const a = Number(data.num1);
    const b = Number(data.num2);

    if (isNaN(a) || isNaN(b)) {
        alert('Введіть коректні числа');
        return;
    }

    let result;

    switch (data.operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b === 0) {
                alert('Ділення на нуль неможливе');
                return;
            }
            result = a / b;
            break;
        default:
            alert('Невідома операція');
            return;
    }

    alert(`Результат: ${result}`);
}
