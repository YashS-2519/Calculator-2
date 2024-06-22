const buttonArray = document.querySelectorAll('.button');
const display = document.querySelector('.resultScreen');

let screenValue = '';
let operand1 = '';
let operand2 = '';
let operator = '';

function displayOnScreen(value) {

    if (value == '') {
        screenValue = value;
    }
    else if (value == '.' && screenValue == '') {
        screenValue += '0.';
    }
    else if (value == '.' && operand1 != '' && operator != '' && operand2 == '') {
        screenValue += '0.';
    }
    else if (value == '-1') {

        screenValue = screenValue.slice(0, -1);
        if (operand1 != '' && operand2 === '' && operator == '' ) {
            operand1 = operand1.slice(0, -1);
        }
        else if (operand1 != '' && operand2 === '' && operator != '') {
            operator = ''
        }
        else if (operand1 != '' && operand2 != '' && operator != '') {
            operand2 = operand2.slice(0, -1);
        }

    }
    else {
        screenValue += value;
    }
    
    display.value = screenValue;
    display.scrollLeft = display.scrollWidth;

}

function calculate() {
    let ans = '';
    operand1 = parseFloat(operand1 == '.' ? '0' : operand1);
    operand2 = parseFloat(operand2 == '.' ? '0' : operand2);
    switch (operator) {
        case '+':
            ans = operand1 + operand2;
            break;
        case '-':
            ans = operand1 - operand2;
            break;
        case '*':
            ans = operand1 * operand2;
            break;
        case '/':
            if (operand2 == 0) {
                alert("Invalid");
            }
            else {
                ans = operand1 / operand2;
            }
            break;
        case '%':
            if (operand2 == 0) {
                alert("Invalid");
            }
            else {
                ans = operand1 % operand2;
            }
            break;
    }
    screenValue = ans.toString();
    operand1 = ans.toString();
    operand2 = '';
    operator = '';
    ans = '';
}

buttonArray.forEach((button) => {
    button.addEventListener('click', () => {
        buttonValue = button.getAttribute('value');
        display.style.color = 'black';
        
        if (buttonValue == 'C') {
            displayOnScreen('');
            screenValue = '';
            operand1 = '';
            operand2 = '';
            operator = '';
        }
        else if (buttonValue == '←') {
            displayOnScreen('-1');
        }
        else if ((buttonValue == '*' || buttonValue == '/' || buttonValue == '+'|| buttonValue == '%') && (screenValue == '-' || screenValue == '')) {
            alert('Invalid Format');
        }
        else if (buttonValue == '=') {
            try {
                calculate();
                display.value = screenValue;
                display.scrollLeft = display.scrollWidth;
                display.style.color = 'green';
            }
            catch (e) {
                screenValue = 'Error';
                display.value = screenValue;
                display.scrollLeft = display.scrollWidth;
            }
        }
        else {
            displayOnScreen(buttonValue);

            if ((!isNaN(buttonValue) || buttonValue == '.') && operator == '') {
                operand1 += buttonValue == '0.' ? '0.' : buttonValue;
            }
            else if ((!isNaN(buttonValue) || buttonValue == '.') && operator != '') {
                operand2 += buttonValue == '0.' ? '0.' : buttonValue;
            }
            else if (isNaN(buttonValue)) {

                if (operand1 == '' && buttonValue == '-') {
                    operand1 += '-';
                }
                else if (operand1 != '-' && operand2 == '' && operator == '') {
                    operator = buttonValue;
                }
                else if (operand1 != '-' && operand2 == '' && operator != '') {
                    operand2 += '-';
                }
                else {
                    calculate();
                    operator = buttonValue;
                    display.value = screenValue + buttonValue;
                    screenValue = display.value;
                    display.scrollLeft = display.scrollWidth;
                }
            }
        }
        
        // console.log(`buttonValue: ${buttonValue} and operand1: ${operand1} and operand2: ${operand2} and Operator: ${operator}`);
        
    });
});