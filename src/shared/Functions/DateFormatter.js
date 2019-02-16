const MonthDictionary = (mo) => {
  switch(parseInt(mo)) {
  case 1:
    return { short: "Jan.", long: "January" }
  case 2:
    return { short: "Feb.", long: "February" }
  case 3:
    return { short: "Mar.", long: "March" }
  case 4:
    return { short: "Apr.", long: "April" }
  case 5:
    return { short: "May", long: "May" }
  case 6:
    return { short: "June", long: "June" }
  case 7:
    return { short: "July", long: "July" }
  case 8:
    return { short: "Aug.", long: "August" }
  case 9:
    return { short: "Sep.", long: "September" }
  case 10:
    return { short: "Oct.", long: "October" }
  case 11:
    return { short: "Nov.", long: "November" }
  case 12:
    return { short: "Dec.", long: "December" }
  default:
    return { short: "", long: "" }
  }
}

const formatted = ({ month, day, year, format }) => {
  const monthString = MonthDictionary(month)
  switch(format) {
    case "monthYear":
      return `${monthString.long} ${year}`
    case "numericMonthYear":
      return `${month}/${year}`
    default:
      return `${monthString.short} ${day}, ${year}`
  }
}

export const fromDateString = (dateString, opts = { format: 'default' }) => {
  const dateElements = dateString.split("-")
  const month = dateElements[1]
  const day = parseInt(dateElements[2] || 0)
  const year = parseInt(dateElements[0] || 1900)
  return formatted({ month: month, year: year, day: day, format: opts.format })
}

export const nextMonth = ({ month, year }) => {
  if (month === 12) {
    return { month: 1, year: (year + 1) }
  } else {
    return { month: (month + 1), year: year }
  }
}

export const prevMonth = ({ month, year }) => {
  if (month === 1) {
    return { month: 12, year: (year - 1) }
  } else {
    return { month: (month - 1), year: year }
  }
}

export default formatted
