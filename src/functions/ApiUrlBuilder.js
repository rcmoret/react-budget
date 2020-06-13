import API_URL from "../constants/Api"
import KEY from "../constants/Key"

const ApiUrlBuilder = (path_segments = [], params = {}) => {
  const query = Object
    .entries({ ...params, key: KEY })
    .map(arr => arr.join("="))
    .join("&")
  const url = [API_URL, ...path_segments].join("/")
  return query === "" ? url : `${url}?${query}`
}

export default ApiUrlBuilder
