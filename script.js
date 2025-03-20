// файл script.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // установка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    // кнопка %
    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) { 
            if (a === '') return;
            expressionResult = (+a) / 100;
            a = expressionResult.toString();
            outputElement.innerHTML = a;
        } else { 
            if (b === '') return;
            expressionResult = (+b) / 100;
            b = expressionResult.toString();
            outputElement.innerHTML = b;
        }
    }
    // кнопка +/-
    document.getElementById("btn_op_sign").onclick = function() {
        if (!selectedOperation) { // Если операция не выбрана, работаем с 'a'
            if (a === '') return;
            a = (-1 * (+a)).toString();
            outputElement.innerHTML = a;
        } else { // Если операция выбрана, работаем с 'b'
            if (b === '') return;
            b = (-1 * (+b)).toString();
            outputElement.innerHTML = b;
        }
    }

    // перевод в радианы
    document.getElementById("btn_op_rad").onclick = function() {
        if (!selectedOperation) {    
            if (a === '') return
            expressionResult = (+a) * (Math.PI / 180)
            a = expressionResult.toString()
            outputElement.innerHTML = a
        } else {
            if (b === '') return
            expressionResult = (+b) * (Math.PI / 180)
            b = expressionResult.toString()
            outputElement.innerHTML = b
        }
    }


    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }

    // Кнопка Backspace
    /*document.getElementById("btn_op_backspace").onclick = function() {
        if (!selectedOperation) {
            a = a.slice(0, -1);
        } else {
            b = b.slice(0, -1);
        }
        outputElement.innerHTML = (!selectedOperation) ? a || '0' : b || '0';
    };*/


    // Квадратный корень
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (!selectedOperation) { 
            if (a === '') return;
            if (+a < 0) { 
                return;
            }
            expressionResult = Math.sqrt(+a);
            a = expressionResult.toString();
            outputElement.innerHTML = a;
        } else {
            if (b === '') return;
            if (+b < 0) { 
                return;
            }
            expressionResult = Math.sqrt(+b);
            b = expressionResult.toString();
            outputElement.innerHTML = b;
        }
    };

    // Возведение в квадрат
    document.getElementById("btn_op_square").onclick = function() {
        if (!selectedOperation) { 
            if (a === '') return;
            expressionResult = Math.pow(+a, 2);
            a = expressionResult.toString();
            outputElement.innerHTML = a;
        } else { 
            if (b === '') return;
            expressionResult = Math.pow(+b, 2);
            b = expressionResult.toString();
            outputElement.innerHTML = b;
        }
    };

    // Факториал (рекурсивная функция)
    function factorial(n) {
        if (n === 0) return 1;
        return n * factorial(n - 1);
    }
    document.getElementById("btn_op_factorial").onclick = function() {
        if (!selectedOperation) {    
            if (a === '' || +a < 0 || !Number.isInteger(+a)) return;
            expressionResult = factorial(+a);
            a = expressionResult.toString();
            outputElement.innerHTML = a;
        } else{
            if (b === '' || +b < 0 || !Number.isInteger(+b)) return;
            expressionResult = factorial(+b);
            b = expressionResult.toString();
            outputElement.innerHTML = b;
        }
    };

    // Три нуля
    document.getElementById("btn_op_triplezero").onclick = function() {
        if (!selectedOperation) {
            a += '000';
            outputElement.innerHTML = a;
        } else {
            b += '000';
            outputElement.innerHTML = b;
        }
    };


    //  Смена цвета результата
    const colorButton = document.getElementById("btn_change_color");
    let resultColor = 'blue';
    colorButton.onclick = function() {
        resultColor = (resultColor === 'blue') ? 'red' : 'blue';
        outputElement.style.color = resultColor;
    };
};
    