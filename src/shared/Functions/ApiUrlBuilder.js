import API_URL from "../Constants/Api"

const ApiUrlBuilder = (path_segments = [], params = {}) => {
  const query = Object.entries(params).map((arr) => { return arr.join("=") }).join("&")
  return `${[API_URL, ...path_segments].join("/")}?${query}`
}

export default ApiUrlBuilder
