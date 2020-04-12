export default (array, findFn, fallbackValue = null) => {
  const result = array.find(findFn)
  if (result === undefined) {
    return fallbackValue
  } else {
    return result
  }
}
