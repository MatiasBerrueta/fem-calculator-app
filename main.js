const keyPad = document.querySelector('[data-key-pad]')
const display = document.querySelector('[data-display-content]')
const themeButtons = document.querySelectorAll('[data-theme-buttons] input')
const activeThemeSelected = document.querySelector('[data-theme-buttons] input:checked')

document.body.classList = `${activeThemeSelected.id}`

themeButtons.forEach(button => {
    button.addEventListener('click', event => {
        document.body.classList = `${event.target.id}`
    })
})

const operators = ['+', '-', '/', 'x', '.']
let firstNumber = ''
let secondNumber = ''
let firstOperator = ''
let result = '0'
let operate = true

function isOperator(key) {
    let isOperator = false
    operators.forEach(operator => {
        if(operator == key) return isOperator = true
    })
    return isOperator
}

function updateDisplay() {
    if(firstNumber == '') firstNumber = '0'
    const currentOperation = `${firstNumber} ${firstOperator} ${secondNumber}`
    display.textContent = currentOperation
}

function clearDisplay() {
    firstNumber = '0'
    secondNumber = ''
    firstOperator = ''
    updateDisplay()
}

function calculate(firstNumber, secondNumber, operator) {
    if(operator == '+') return (parseInt(firstNumber) + parseInt(secondNumber)).toString()
    if(operator == '-') return (parseInt(firstNumber) - parseInt(secondNumber)).toString()
    if(operator == '/') return (parseInt(firstNumber) / parseInt(secondNumber)).toString()
    if(operator == 'x') return (parseInt(firstNumber) * parseInt(secondNumber)).toString()
}

function showResult() {
    if(secondNumber == '' || firstOperator == '') return
    firstNumber = calculate(firstNumber, secondNumber, firstOperator)
    secondNumber = ''
    firstOperator = ''
    updateDisplay()
}

function deleteLastInput() {
    if(secondNumber != '') {
        secondNumber = secondNumber.slice(0, -1)
        if(secondNumber.length == 0) operate = false
    } else if(firstOperator != '') {
        operate = true
        firstOperator = ''
    } else {
        firstNumber = firstNumber.slice(0, -1)
    }
    updateDisplay()
}

function handlePressedKey(pressedKey) {
    if(pressedKey == 'reset') return clearDisplay()
    if(pressedKey == 'del') return deleteLastInput()
    if(pressedKey == '=') return showResult()

    if(isOperator(pressedKey) && operate && firstOperator == '') {
        operate = false
        firstOperator = pressedKey
        return updateDisplay()
    }
    if(isOperator(pressedKey) && firstOperator != '') {
        if(!operate) firstOperator = pressedKey
        else {
            firstNumber = calculate(firstNumber, secondNumber, firstOperator)
            secondNumber = ''
            firstOperator = pressedKey
        }
        return updateDisplay()
    }
    
    if(firstNumber == 0 && firstOperator == '' && !isOperator(pressedKey)) {
        operate = true
        firstNumber = pressedKey
        return updateDisplay()
    }
    if(firstNumber != 0 && firstOperator == '' && !isOperator(pressedKey)) {
        operate = true
        firstNumber += pressedKey
        return updateDisplay()
    }
    if(secondNumber == 0 && firstOperator != '' && !isOperator(pressedKey)) {
        operate = true
        secondNumber = pressedKey
        return updateDisplay()
    }
    if(secondNumber != 0 && firstOperator != '' && !isOperator(pressedKey)) {
        operate = true
        secondNumber += pressedKey
        return updateDisplay()
    }
}

keyPad.addEventListener('click', (event) => {
    if(event.target.classList == 'key-pad') return
    const pressedKey = event.target.value
    handlePressedKey(pressedKey)
})

// keyPad.forEach(key => {
//     key.addEventListener('click', event => {
//         if(event.target.classList == 'key-pad') return
//         const pressedKey = event.target.textContent
//     handlePressedKey(pressedKey)
        
//     })
// })