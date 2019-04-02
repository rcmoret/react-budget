import API_URL from "../Constants/Api"

const ApiUrlBuilder = (path_segments = [], params = {}) => {
  const query = Object.entries(params).map((arr) => { return arr.join("=") }).join("&")
  const url = [API_URL, ...path_segments].join("/")
  return query === "" ? url : `${url}?${query}`
}

export default ApiUrlBuilder
