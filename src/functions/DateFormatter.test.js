import DateFormatter, {
  endOfDayFromDateString,
  fromDateString,
  fromDateTimeObject,
  nextMonth,
  prevMonth,
  isInRange,
  before,
  today,
} from "./DateFormatter"

it("returns a default date format eg Dec. 13, 2019", () => {
  const actual = DateFormatter({ month: 12, day: 13, year: 2019 })
  expect(actual).toEqual("Dec. 13, 2019")
})

it("returns a date object if dateObject format is specified", () => {
  const actual = DateFormatter({ month: 12, day: 13, year: 2019, format: "dateObject" })
  expect(actual).toEqual(new Date(2019, 11, 13))
})

it("returns the full name of the month if 'longMonth' is the specified format", () => {
  const actual = DateFormatter({ month: 12, day: 13, year: 2019, format: "longMonth" })
  expect(actual).toEqual("December")
})

it("returns the month slash day when 'm/d' is the specified format", () => {
  const actual = DateFormatter({ month: 2, day: 3, year: 2019, format: "m/d" })
  expect(actual).toEqual("2/3")
})

it("returns the month slash day slash year and is 0 padded  when 'mm/dd/yyyy' is the specified format", () => {
  const actual = DateFormatter({ month: 2, day: 3, year: 2019, format: "mm/dd/yyyy" })
  expect(actual).toEqual("02/03/2019")
})

it("returns the full name of month and 4 digit year when 'monthYear' is the specified format", () => {
  const actual = DateFormatter({ month: 5, year: 2021, day: 30, format: "monthYear" })
  expect(actual).toEqual("May 2021")
})

it("returns the number of the month slash 4 digit year when 'numericMonthYear' is the specified format", () => {
  const actual = DateFormatter({ month: 3, year: 2018, day: 2, format: "numericMonthYear" })
  expect(actual).toEqual("3/2018")
})

it("returns a plain old object with day, month and year properties when 'object' is the specified format", () => {
  const actual = DateFormatter({ month: 3, year: 2018, day: 2, format: "object" })
  expect(actual).toEqual({ month: 3, year: 2018, day: 2 })
})

it("returns the shortened name of the month and 4 digit year when 'shortMonthYear' is the specified format", () => {
  const actual = DateFormatter({ month: 3, year: 2018, day: 2, format: "shortMonthYear" })
  expect(actual).toEqual("Mar. 2018")
})

it("returns the 4 digit year, numeric month and day zero-padded when 'yyyy-mm-dd' is the specified format", () => {
  const actual = DateFormatter({ month: 3, year: 2018, day: 2, format: "yyyy-mm-dd" })
  expect(actual).toEqual("2018-03-02")
})

// fromDateString
it("returns a formatted string from a date string", () => {
  const actual = fromDateString("2020-08-10")
  expect(actual).toEqual("Aug. 10, 2020")
})

it("returns any format from a date string", () => {
  const actual = fromDateString("2020-08-10", { format: "numericMonthYear" })
  expect(actual).toEqual("8/2020")
})

// fromDateTimeString
it("returns a formatted string from a date time string", () => {
  const timeString = "8/9/2020, 12:00:00 AM"
  const actual = fromDateTimeObject(timeString)
  expect(actual).toEqual("2020-08-09")
})

// nextMonth
it("returns the next month and year as a plain object", () => {
  const actual = nextMonth({ month: 12, year: 2020 })
  expect(actual).toEqual({ month: 1, year: 2021 })
})

it("returns the next month as a plain object", () => {
  const actual = nextMonth({ month: 2, year: 2020 })
  expect(actual).toEqual({ month: 3, year: 2020 })
})

//prevMonth
it("returns the previous month and year when Jan.", () => {
  const actual = prevMonth({ month: 1, year: 2020 })
  expect(actual).toEqual({ month: 12, year: 2019 })
})

it("returns the previous month", () => {
  const actual = prevMonth({ month: 4, year: 2020 })
  expect(actual).toEqual({ month: 3, year: 2020 })
})

// isInRange
it("returns true when in range", () => {
  const actual = isInRange("2020-03-15", ["2020-03-01", "2020-03-31"])
  expect(actual).toEqual(true)
})

it("returns true when on the beginning edge", () => {
  const actual = isInRange("2020-03-01", ["2020-03-01", "2020-03-31"])
  expect(actual).toEqual(true)
})

it("returns true when on the far edge", () => {
  const actual = isInRange("2020-03-31", ["2020-03-01", "2020-03-31"])
  expect(actual).toEqual(true)
})

it("returns false when out of the range", () => {
  const actual = isInRange("2020-04-01", ["2020-03-01", "2020-03-31"])
  expect(actual).toEqual(false)
})

// before
it("returns true for dates before the target", () => {
  const actual = before("2020-04-01", "2020-04-02")
  expect(actual).toEqual(true)
})


it("returns false for dates after the target", () => {
  const actual = before("2020-04-03", "2020-04-02")
  expect(actual).toEqual(false)
})

it("returns false for the same day", () => {
  const actual = before("2020-04-03", "2020-04-03")
  expect(actual).toEqual(false)
})

// end of day from a date string
it("returns a date object", () => {
  const actual = endOfDayFromDateString("2020-02-29")
  const offset = today("dateObject").getTimezoneOffset() / 60
  expect(actual).toEqual(new Date(`2020-02-29 23:59:59Z-${offset}`))
})
