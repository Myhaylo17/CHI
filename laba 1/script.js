const data = {
    num1: '',
    num2: '',
    operator: ''
};

const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operatorInput = document.getElementById('operator');

function handleNum1Blur() {
    data.num1 = num1Input.value;
}

function handleNum2Blur() {
    data.num2 = num2Input.value;
}

function handleOperatorBlur() {
    data.operator = operatorInput.value;
}

num1Input.addEventListener('blur', handleNum1Blur);
num2Input.addEventListener('blur', handleNum2Blur);
operatorInput.addEventListener('blur', handleOperatorBlur);

function removeBlurListeners() {
    num1Input.removeEventListener('blur', handleNum1Blur);
    num2Input.removeEventListener('blur', handleNum2Blur);
    operatorInput.removeEventListener('blur', handleOperatorBlur);
}

function addValue(value) {
    if (!operatorInput.value) {
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

    data.num1 = '';
    data.num2 = '';
    data.operator = '';
}

function calculate() {
    if (!data.num1 || !data.num2 || !data.operator) {
        alert('Будь ласка, введіть обидва числа та операцію');
        return;
    }

    const firstNumber = +data.num1;
    const secondNumber = +data.num2;

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        alert('Введіть коректні числа');
        return;
    }

    let result;

    switch (data.operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            if (secondNumber === 0) {
                alert('Ділення на нуль неможливе');
                return;
            }
            result = firstNumber / secondNumber;
            break;
        default:
            alert('Невідома операція');
            return;
    }

    alert(`Результат: ${result}`);
}
