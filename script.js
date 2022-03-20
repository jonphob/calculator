//Basic calculator functions and operate function
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const numbers = document.querySelectorAll("[data-number]");
const operands = document.querySelectorAll("[data-operand]");
const equals = document.querySelector("[data-equals]");
const display = document.querySelector(".mainDisplay");
const secondaryDisplay = document.querySelector(".secondaryDisplay");

let displayNumber = "";
let firstNumber;
let secondNumber;
let operandSet = false;
let operand;

console.log(displayNumber.length);

const appendDisplay = (number) => {
  if (displayNumber.length == 0) {
    displayNumber = number;
    display.innerText = displayNumber;
  } else {
    displayNumber += number;
    display.innerText = displayNumber;
  }
};

const getNumber = (e) => {
  let value = e.target.getAttribute("data-number");
  appendDisplay(value);
};

const getOperand = (e) => {
  operand = e.target.getAttribute("data-operand");
  if (!firstNumber) {
    firstNumber = displayNumber;
    console.log(`First Number = ${firstNumber}`);
  }
  operandSet = true;
  displayNumber = "";

  console.log(operand);
};

const getEquals = () => {
  console.log("Equals clicked");
  secondNumber = displayNumber;
  console.log(`Second Number = ${secondNumber}`);
  result = operate(operand, firstNumber, secondNumber);
  displayNumber = "";
  appendDisplay(result);
};

equals.addEventListener("click", getEquals);

numbers.forEach((button) => {
  button.addEventListener("click", getNumber);
});

operands.forEach((button) => {
  button.addEventListener("click", getOperand);
});

const operate = (operator, a, b) => {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);

    default:
      break;
  }
};

equals.addEventListener("click", operate(operand, firstNumber, secondNumber));
