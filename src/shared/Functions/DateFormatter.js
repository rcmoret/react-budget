
const DateFormatter = (dateString) => {
  const MonthDictionary = {
    '01': 'Jan.',
    '02': 'Feb.',
    '03': 'Mar.',
    '04': 'Apr.',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'Aug.',
    '09': 'Sep.',
    '10': 'Oct.',
    '11': 'Nov.',
    '12': 'Dec.',
  }

  const dateElements = dateString.split('-')
  const month = MonthDictionary[dateElements[1]]
  const day = parseInt(dateElements[2]) + ','
  return [month, day, dateElements[0]].join(' ')
}

export default DateFormatter;
