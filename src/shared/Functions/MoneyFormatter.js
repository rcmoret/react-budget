const MoneyFormatter = (number, opts = { absolute: false }) => {
  if (number === null) {
    return ''
  } else {
    const num = opts.absolute ? Math.abs(number) : number
    return '$' + (num / 100.0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }
}

export default MoneyFormatter;
