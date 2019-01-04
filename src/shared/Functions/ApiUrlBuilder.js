import API_URL from '../Constants/Api'

const ApiUrlBuilder = (...path_segments) => {
  return [API_URL, ...path_segments].join('/')
}

export default ApiUrlBuilder;
