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
const cancelBtn = document.querySelector("[data-cancel]");
const percent = document.querySelector("[data-percent]");

let displayNumber = "";
let firstNumber;
let secondNumber;
let operandSet = false;
let operand;
let result;

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
    firstNumber = parseFloat(displayNumber);
    console.log(`First Number = ${firstNumber}`);
  }
  displayNumber = "";
  console.log(operand);
};

const getEquals = () => {
  console.log("Equals clicked");
  secondNumber = parseFloat(displayNumber);
  console.log(`Second Number = ${secondNumber}`);
  result = operate(operand, firstNumber, secondNumber);

  if (typeof result === "string") {
    result = result;
  } else {
    result = Math.round((result + Number.EPSILON) * 1000000000) / 1000000000;
  }

  displayNumber = "";
  appendDisplay(result);
  displayNumber = "";
  firstNumber = null;
  secondNumber = null;
};

const clearDisplay = () => {
  displayNumber = "";
  firstNumber = null;
  secondNumber = null;
  display.innerText = "0";
};

const calcPercent = () => {
  if (!secondNumber) {
    if (operand === "add" || operand === "subtract") {
      secondNumber = displayNumber;
      result = (secondNumber / 100) * firstNumber;
      displayNumber = result;
    } else {
      secondNumber = displayNumber;
      result = secondNumber / 100;
      displayNumber = result;
      display.innerText = result;
    }
  }
};

const operate = (operator, a, b) => {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      if (b === 0) {
        return "Really??";
      } else {
        return divide(a, b);
      }

    default:
      break;
  }
};

equals.addEventListener("click", getEquals);

numbers.forEach((button) => {
  button.addEventListener("click", getNumber);
});

operands.forEach((button) => {
  button.addEventListener("click", getOperand);
});

cancelBtn.addEventListener("click", clearDisplay);

percent.addEventListener("click", calcPercent);
