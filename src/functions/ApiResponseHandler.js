export default (response) => {
  if (!response.ok) {
    throw { response }
  } else {
    return response.json()
  }
}
