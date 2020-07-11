import EvaluateInput from "./DynamicInputEvaluator"

// Misc examples
it("returns the value when it doesn't match the regexp", () => {
  const string = "1.23"
  const actual = EvaluateInput(string)
  expect(actual).toEqual(string)
})

it("returns the value when it's a mess", () => {
  const string = "foo bar"
  const actual = EvaluateInput(string)
  expect(actual).toEqual(string)
})

// addition
it("returns the sum when it's a addition", () => {
  const string = "2.30 + 3.45"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("5.75")
})

it("returns the sum when it's a addition", () => {
  const string = " 2.30 + 3.45 "
  const actual = EvaluateInput(string)
  expect(actual).toEqual("5.75")
})

it("returns the sum when it's a addition", () => {
  const string = "-2.30 + 3.45 "
  const actual = EvaluateInput(string)
  expect(actual).toEqual("1.15")
})

it("works with integers", () => {
  const string = "3+1.4"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("4.40")
})

it("works with integers", () => {
  const string = "3+4"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("7.00")
})

// subtraction
it("returns the difference when it's subtraction", () => {
  const string = "2.30 - 3.45"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("-1.15")
})

it("returns the difference when it's subtraction", () => {
  const string = " 2.30 - 3.45 "
  const actual = EvaluateInput(string)
  expect(actual).toEqual("-1.15")
})

it("returns the difference when it's subtraction", () => {
  const string = "-2.30 - 3.45 "
  const actual = EvaluateInput(string)
  expect(actual).toEqual("-5.75")
})

it("works with integers", () => {
  const string = "3-1.4"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("1.60")
})

it("works with integers", () => {
  const string = "3-4"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("-1.00")
})

// multiplication
it("returns the product when it's multiplication", () => {
  const string = "2.30 * 3.45"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("7.93")
})

it("returns the product when it's multiplication", () => {
  const string = " 2.30 * 3.45 "
  const actual = EvaluateInput(string)
  expect(actual).toEqual("7.93")
})

it("returns the product when it's multiplication", () => {
  const string = " 2.30 * 3.45 "
  const actual = EvaluateInput(string)
  expect(actual).toEqual("7.93")
})

it("works with integers", () => {
  const string = "3*1.4"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("4.20")
})

it("works with negative integers", () => {
  const string = "-3*1.4"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("-4.20")
})

it("works with integers", () => {
  const string = "3*4"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("12.00")
})

it("works with negative integers", () => {
  const string = "-3* 4"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("-12.00")
})

// division
it("returns the quotient when it's division", () => {
  const string = "2.30 / 3.45"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("0.67")
})

it("returns the quotient when it's division", () => {
  const string = " 2.30 / 3.45 "
  const actual = EvaluateInput(string)
  expect(actual).toEqual("0.67")
})

it("returns the quotient when it's division", () => {
  const string = " 2.30 / 3.45 "
  const actual = EvaluateInput(string)
  expect(actual).toEqual("0.67")
})

it("works with integers", () => {
  const string = "3/1.4"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("2.14")
})

it("works with negative integers", () => {
  const string = "-3/1.4"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("-2.14")
})

it("works with integers", () => {
  const string = "3/4"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("0.75")
})

it("works with negative integers", () => {
  const string = "-3/ 4"
  const actual = EvaluateInput(string)
  expect(actual).toEqual("-0.75")
})
