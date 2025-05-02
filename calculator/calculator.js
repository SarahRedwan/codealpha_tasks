let currentNumber = '';
let previousNumber = '';
let operation = null;

// Append a number to the display
function appendNumber(number) {
  if (number === '.' && currentNumber.includes('.')) return; // Prevent multiple decimals
  currentNumber += number;
  updateDisplay();
}

// Choose an operation
function chooseOperation(op) {
  if (currentNumber === '') return;
  if (previousNumber !== '') {
    compute();
  }
  operation = op;
  previousNumber = currentNumber;
  currentNumber = '';
  updateDisplay();
}

// Compute the result
function compute() {
  const prev = parseFloat(previousNumber);
  const curr = parseFloat(currentNumber);
  if (isNaN(prev) || isNaN(curr)) return;
  let result;
  switch (operation) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      if (curr === 0) {
        alert("Cannot divide by zero!");
        clearDisplay();
        return;
      }
      result = prev / curr;
      break;
    default:
      return;
  }
  currentNumber = result.toString();
  operation = null;
  previousNumber = '';
  updateDisplay();
}

// Clear the display
function clearDisplay() {
  currentNumber = '';
  previousNumber = '';
  operation = null;
  updateDisplay();
}

// Format the number for display (optional)
function formatNumber(number) {
  if (number.includes('.')) {
    const [integerPart, decimalPart] = number.split('.');
    return `${parseFloat(integerPart).toLocaleString()}.${decimalPart}`;
  } else {
    return parseFloat(number).toLocaleString();
  }
}

// Update the display
function updateDisplay() {
  const display = document.getElementById('display');
  if (currentNumber === '' && previousNumber === '') {
    display.innerText = '0';
  } else if (currentNumber !== '') {
    display.innerText = formatNumber(currentNumber);
  } else {
    display.innerText = formatNumber(previousNumber) + (operation || '');
  }
}
