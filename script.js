//Basic calculator functions and operate function
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const numbers = document.querySelectorAll("[data-number]");
const numbersArray = Array.from(numbers);
const operands = document.querySelectorAll("[data-operand]");
const equals = document.querySelector("[data-equals]");
const display = document.querySelector(".mainDisplay");
const secondaryDisplay = document.querySelector(".secondaryDisplay");
const cancelBtn = document.querySelector("[data-cancel]");
const percent = document.querySelector("[data-percent]");
const plusMinus = document.querySelector("[data-plus_minus]");
const decimal = document.querySelector("[data-decimal]");
const keyArray = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "*",
  "=",
  "+",
  "-",
  "/",
  "%",
  ".",
  "Escape",
  "±",
  "Enter",
];
console.log(numbersArray);
let displayNumber = "";
let firstNumber;
let secondNumber;
let operand;
let result;
let minusSign = false;
let equalsPressed = false;

const appendDisplay = (number) => {
  if (displayNumber.length == 0) {
    displayNumber = number;
    display.innerText = displayNumber;
  } else {
    displayNumber += number;
    display.innerText = displayNumber;
  }
};

const getNumber = (e, d = false) => {
  equalsPressed = false;
  minusSign ? (minusSign = false) : null;
  let value;
  if (!d) {
    value = e.target.getAttribute("data-number");
    appendDisplay(value);
  } else {
    value = e;
    appendDisplay(value);
  }
};

const getOperand = (e, d = false) => {
  if (!d) {
    operand = e.target.getAttribute("data-operand");
  } else {
    operand = e;
  }
  if (!firstNumber) {
    firstNumber = parseFloat(displayNumber);
  }
  displayNumber = "";
  enableDecimal();
};

const getEquals = () => {
  if (equalsPressed) {
    return null;
  }
  secondNumber = parseFloat(displayNumber);
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
  equalsPressed = true;
  enableDecimal();
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

const addPlusMinus = () => {
  if (displayNumber.length === 0) {
    return null;
  }

  if (minusSign) {
    displayNumber = displayNumber.substring(1);
    minusSign = false;
    display.innerText = displayNumber;
    console.log(minusSign);
  } else {
    displayNumber = "-" + displayNumber;
    display.innerText = displayNumber;
    minusSign = true;
  }
};

const addDecimal = () => {
  if (displayNumber) {
    displayNumber = displayNumber + ".";
  } else {
    displayNumber = "0.";
  }
  display.innerText = displayNumber;
  decimal.removeEventListener("click", addDecimal);
  decimal.classList.add("disabled");
};

const enableDecimal = () => {
  decimal.addEventListener("click", addDecimal);
  decimal.classList.remove("disabled");
};

const enableEquals = () => {
  equals.addEventListener("click", addDecimal);
  equals.classList.remove("disabled");
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

//** Event Listeners **/

numbers.forEach((button) => {
  button.addEventListener("click", getNumber);
});

operands.forEach((button) => {
  button.addEventListener("click", getOperand);
});

equals.addEventListener("click", getEquals);
cancelBtn.addEventListener("click", clearDisplay);
percent.addEventListener("click", calcPercent);
plusMinus.addEventListener("click", addPlusMinus);
decimal.addEventListener("click", addDecimal);

const keyCodes = () => {
  document.addEventListener("keydown", function (e) {
    //console.log(e);
    if (keyArray.includes(e.key)) {
      const key = isFinite(e.key);

      if (key) {
        let keyValue = e.key;
        let keyInt = parseInt(keyValue);
        if (keyInt === 0) {
          keyInt = 10;
        }
        numbersArray[keyInt - 1].classList.add("active");
        setTimeout(() => {
          numbersArray[keyInt - 1].classList.remove("active");
        }, 100);
        getNumber(keyValue, true);
      } else {
        switch (e.key) {
          case "+":
            getOperand("add", true);
            break;
          case "-":
            getOperand("subtract", true);
            break;
          case "*":
            getOperand("multiply", true);
            break;
          case "/":
            getOperand("divide", true);
            break;
          case "Enter":
            getEquals("getEquals");
            break;
          case "=":
            getEquals("getEquals");
          case "%":
            calcPercent("calcPercent");
            break;
          case ".":
            addDecimal("addDecimal");
            break;
          case "±":
            addPlusMinus("addPlusMinus");
            break;
          case "Escape":
            clearDisplay();
            break;
          default:
            break;
        }
      }
    } else {
      return null;
    }
  });
};
keyCodes();
