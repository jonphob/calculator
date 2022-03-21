//Basic calculator functions and operate function
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const numbers = document.querySelectorAll("[data-number]");
const operands = document.querySelectorAll("[data-operand]");
const otherKeys = document.querySelectorAll(".other");
const equals = document.querySelector("[data-equals]");
const display = document.querySelector(".mainDisplay");
const secondaryDisplay = document.querySelector(".secondaryDisplay");
const cancelBtn = document.querySelector("[data-cancel]");
const percent = document.querySelector("[data-percent]");
const plusMinus = document.querySelector("[data-plus_minus]");
const decimal = document.querySelector("[data-decimal]");
const numbersArray = Array.from(numbers);
const operandsArray = Array.from(operands);
const otherKeysArray = Array.from(otherKeys);
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

let displayNumber = "";
let firstNumber;
let secondNumber;
let operand;
let newOperand;
let result;
let minusSign = false;
let equalsPressed = true;

const appendDisplay = (number) => {
  if (displayNumber.length == 0) {
    displayNumber = number;
    display.innerText = displayNumber;
  } else {
    displayNumber += number;
    display.innerText = displayNumber;
  }
  if (displayNumber.length > 11) {
    display.style.fontSize = "4.5rem";
  }
  if (displayNumber.length > 14) {
    display.style.fontSize = "2.5rem";
  }
};

const getNumber = (keyValue, isKeyPress = false) => {
  if (equalsPressed) {
    clearDisplay();
  }

  minusSign ? (minusSign = false) : null;
  let value;

  if (!isKeyPress) {
    value = keyValue.target.getAttribute("data-number");
    appendDisplay(value);
  } else {
    value = keyValue;
    appendDisplay(value);
  }
};

const getOperand = (keyValue, isKeyPress = false) => {
  if (equalsPressed) {
    return null;
  }
  if (operand) {
    if (!isKeyPress) {
      newOperand = keyValue.target.getAttribute("data-operand");
    } else {
      newOperand = keyValue;
    }
    equalsPressed = false;
    secondNumber = parseFloat(displayNumber);
    result = operate(operand, firstNumber, secondNumber);
    display.innerText = result;
    firstNumber = result;
    operand = newOperand;
    newOperand = null;
  } else {
    if (!isKeyPress) {
      operand = keyValue.target.getAttribute("data-operand");
    } else {
      operand = keyValue;
    }

    if (!firstNumber) {
      firstNumber = parseFloat(displayNumber);
    }
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

  //to account for div/0 error message
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
  operand = null;
  newOperand = null;
  result = 0;
  minusSign = false;
  equalsPressed = false;
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

const addActiveOnKeypress = (index, array) => {
  array[index].classList.add("active");
  setTimeout(() => {
    array[index].classList.remove("active");
  }, 200);
};

const keyCodes = () => {
  document.addEventListener("keydown", function (e) {
    if (keyArray.includes(e.key)) {
      const key = isFinite(e.key);

      if (key) {
        let keyValue = e.key;
        let keyInt = parseInt(keyValue);

        if (keyInt === 0) {
          keyInt = 10;
        }

        addActiveOnKeypress(keyInt - 1, numbersArray);

        getNumber(keyValue, true);
      } else {
        switch (e.key) {
          case "+":
            getOperand("add", true);
            addActiveOnKeypress(3, operandsArray);
            break;
          case "-":
            getOperand("subtract", true);
            addActiveOnKeypress(2, operandsArray);
            break;
          case "*":
            getOperand("multiply", true);
            addActiveOnKeypress(1, operandsArray);
            break;
          case "/":
            getOperand("divide", true);
            addActiveOnKeypress(0, operandsArray);
            break;
          case "Enter":
            getEquals("getEquals");
            addActiveOnKeypress(4, otherKeysArray);
            break;
          case "=":
            getEquals("getEquals");
            addActiveOnKeypress(4, otherKeysArray);
            break;
          case "%":
            calcPercent("calcPercent");
            addActiveOnKeypress(2, otherKeysArray);
            break;
          case ".":
            addDecimal("addDecimal");
            addActiveOnKeypress(3, otherKeysArray);
            break;
          case "±":
            addPlusMinus("addPlusMinus");
            addActiveOnKeypress(1, otherKeysArray);
            break;
          case "Escape":
            clearDisplay();
            addActiveOnKeypress(0, otherKeysArray);
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
