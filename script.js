let displayValue = "0";
let firstNumber = null;
let secondNumber = null;
let firstOperand = null;
let secondOperand = null;
let result = null;

const btns = document.querySelectorAll("button");

window.addEventListener("keydown", (e) => {
  const key = document.querySelector(`button[data-key='${e.key}']`);
  key.click();
});

const updateDisplay = () => {
  let display = document.querySelector(".mainDisplay");
  display.innerText = displayValue;
  if (displayValue.length > 9) {
    display.innerText = displayValue.substring(0, 9);
  }
};
updateDisplay();

const operandInput = (value) => {
  //handle first click
  if (displayValue === "0") {
    displayValue = value;
  } else {
    displayValue += value;
  }
};

const equals = () => {};

const operatorInput = () => {};

const decimalInput = () => {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  } else {
    displayValue = displayValue;
  }
};

const percentInput = () => {};

const plusMinusInput = () => {
  if (!displayValue.includes("-")) {
    displayValue = "-" + displayValue;
  } else {
    displayValue = displayValue.substring(1);
  }
  updateDisplay();
};

const clearDisplay = () => {
  firstNumber = null;
  secondNumber = null;
  firstOperand = null;
  secondOperand = null;
  result = null;
  displayValue = "0";
};

function clickButton() {
  console.log(btns);
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      if (btns[i].classList.contains("operand")) {
        operandInput(btns[i].value);
        updateDisplay();
      } else if (btns[i].classList.contains("operator")) {
        console.log(btns[i].value);
        //operatorInput(btns[i].value);
      } else if (btns[i].classList.contains("equals")) {
        console.log(btns[i].value);
        //equalsInput();
        updateDisplay();
      } else if (btns[i].classList.contains("decimal")) {
        console.log(btns[i].value);
        decimalInput(btns[i].value);
        updateDisplay();
      } else if (btns[i].classList.contains("percent")) {
        console.log(btns[i].value);
        //percentInput(displayValue);
        updateDisplay();
      } else if (btns[i].classList.contains("plus_minus")) {
        console.log(btns[i].value);
        plusMinusInput(displayValue);
        updateDisplay();
      } else if (btns[i].classList.contains("cancel")) {
        clearDisplay();
        updateDisplay();
      }
    });
  }
}
clickButton();
