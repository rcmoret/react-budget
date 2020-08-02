const equationRegexp = /\s*(-?\d*\.?\d?\d)\s*([-+/*])\s*(\d*(\.\d+)?)\s*/

const evaluateInput = inputAmount => {
  const match = inputAmount.match(equationRegexp)

  if (match === null) {
    return inputAmount
  } else {
    const operator = match[2]
    const num1 = parseFloat(match[1])
    const num2 = parseFloat(match[3])
    return operate(operator, num1, num2).toFixed(2)
  }
}

const operate = (operator, num1, num2) => {
  switch(operator) {
  case "+":
    return num1 + num2
  case "-":
    return num1 - num2
  case "*":
    return num1 * num2
  case "/":
    return num1 / num2
  default:
    throw new Error("unknown operator")
  }
}

export default evaluateInput
