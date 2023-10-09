document.addEventListener("DOMContentLoaded", function () {
  const resultDisplay = document.getElementById("result");
  let currentInput = "";
  let currentOperator = "";
  let previousValue = "";

  const clearCalculator = () => {
      currentInput = "";
      currentOperator = "";
      previousValue = "";
      resultDisplay.textContent = "0";
  };

  const calculateResult = () => {
      return new Promise((resolve, reject) => {
          const num1 = parseFloat(previousValue);
          const num2 = parseFloat(currentInput);

          if (isNaN(num1) || isNaN(num2)) {
              reject("Invalid input");
          }

          switch (currentOperator) {
              case "+":
                  resolve(num1 + num2);
                  break;
              case "-":
                  resolve(num1 - num2);
                  break;
              case "*":
                  resolve(num1 * num2);
                  break;
              case "/":
                  if (num2 === 0) {
                      reject("Divide by zero error");
                  }
                  resolve(num1 / num2);
                  break;
              default:
                  reject("Invalid operator");
          }
      });
  };

  document.querySelectorAll("#number").forEach((button) => {
      button.addEventListener("click", () => {
          currentInput += button.textContent;
          resultDisplay.textContent = currentInput;
      });
  });

  document.querySelectorAll("#operator").forEach((button) => {
      button.addEventListener("click", () => {
          if (currentInput !== "") {
              previousValue = currentInput;
              currentInput = "";
              currentOperator = button.textContent;
          }
      });
  });

  document.getElementById("clear").addEventListener("click", clearCalculator);

  document.getElementById("calculate").addEventListener("click", () => {
      if (currentInput !== "" && currentOperator !== "") {
          calculateResult()
              .then((result) => {
                  resultDisplay.textContent = result;
                  previousValue = result.toString();
                  currentInput = "";
                  currentOperator = "";
              })
              .catch((error) => {
                  resultDisplay.textContent = error;
              });
      }
  });
});
