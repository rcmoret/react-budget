const MoneyFormatter = (number, opts = { absolute: false, toFloat: false }) => {
  if (number === null) {
    return ""
  } else if (opts.toFloat) {
    const num = opts.absolute ? Math.abs(number) : number
    return (num / 100.0)
  } else {
    const num = opts.absolute ? Math.abs(number) : number
    return "$" + (num / 100.0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }
}

export const decimalToInt = (amount) => {
  return Math.round(parseFloat(amount) * 100)
}

export default MoneyFormatter
