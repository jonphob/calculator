//Basic calculator functions and operate function
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const keys = document.querySelectorAll(".keys");
const display = document.querySelector(".mainDisplay");
const secondaryDisplay = document.querySelector(".secondaryDisplay");
let firstNumber;
let secondNumber;
let operand;
let result;

const operate = (operator, a, b) => {
  result = operator(a, b);
  return result;
};

console.log(operate(multiply, 4, 5));

const getClick = (e) => {
  console.log(e);
  let btnType = e.target.getAttribute("data-type");
  let btnValue = e.target.getAttribute("data-value");
  let operandSymbol = e.target.innerText;

  if (btnValue === "cancel") {
    console.log(`${btnType} ${btnValue} clicked`);
    clearAll();
    console.log("display cleared");
  }

  //if button is operand

  if (btnType === "operand") {
    operand = btnValue;

    if (firstNumber && !secondNumber) {
      firstNumber = parseInt(firstNumber);
      console.log(
        `Typeof: ${typeof firstNumber}, Stored Value is ${firstNumber}, Operand is ${operand}`
      );
      secondaryDisplay.innerText = `${firstNumber} ${operandSymbol}`;
      clearDisplay();

      display.innerText = 0;
    }

    if (firstNumber && secondNumber) {
      console.log(
        `Stored value is ${secondNumber}, Display Value is ${firstNumber}, Operand Value is ${btnValue}`
      );
      if (btnValue === "multiply" || btnValue === "equals") {
        console.log(operate(multiply, firstNumber, secondNumber));
        display.innerText = operate(multiply, firstNumber, secondNumber);
      }
    }
  }

  // if button is number

  if (btnType === "number") {
    if (!firstNumber) {
      firstNumber = btnValue;
    } else {
      firstNumber += btnValue;
    }
    console.log(`Current Value is ${parseInt(firstNumber)}`);
    display.innerText = firstNumber;
  }
};

//adds event listeners to all calculator btns
const addEventListenerList = (list, event, fn) => {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
};

//Clear Display
const clearDisplay = () => {
  display.innerText = "0";
  operand = null;
  firstNumber = 0;
};

const clearAll = () => {
  display.innerText = "0";
  secondaryDisplay.innerText = "";
  firstNumber = 0;
  secondNumber = 0;
  operand = null;

  result = 0;
};

addEventListenerList(keys, "click", getClick);
