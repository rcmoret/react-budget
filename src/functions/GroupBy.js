export default (array, key) => {
  const values = array
    .map(item => item[key])
    .filter((v, i, a) => a.indexOf(v) === i)

  const reducer = (collection, value) => {
    collection.push({ [key]: value, collection: array.filter(item => item[key] === value) })
    return collection
  }

  return values.reduce(reducer, [])
}
