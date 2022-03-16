//Basic calculator functions and operate function
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const keys = document.querySelectorAll(".keys");
const display = document.querySelector(".display p");
let displayData;

let total;

const operate = (operator, a, b) => {
  total = operator(a, b);
  return total;
};

console.log(operate(add, 3, 2));

const logClick = (e) => {
  let btnType = e.target.getAttribute("data-type");
  let btnValue = e.target.getAttribute("data-value");

  if (btnType === "operand") {
    if (btnValue === "cancel") {
      console.log(`${btnType} ${btnValue} clicked`);
      clearDisplay();
      console.log("display cleared");
    } else {
      console.log(`${btnType} ${btnValue} clicked`);
    }
  }
  if (btnType === "number") {
    console.log(`${btnType} ${btnValue} clicked`);
    if (!displayData) {
      displayData = btnValue;
    } else {
      displayData += btnValue;
    }
    display.innerText = displayData;
    // console.log(`Display Data: ${displayData}`);
  }
};

//adds event listeners to all calculator bns
const addEventListenerList = (list, event, fn) => {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
};

//Clear Display
const clearDisplay = () => {
  display.innerText = "";
};

addEventListenerList(keys, "click", logClick);
