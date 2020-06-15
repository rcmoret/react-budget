const initialState = {
  apiKey: "",
  newApiKey: ""
}

export default (state = initialState, action) => {
  switch(action.type) {
  case "key/EDITED":
    return { ...state, newApiKey: action.payload.apiKey }
  case "key/UPDATED":
    return { ...state, apiKey: action.payload.apiKey, newApiKey: "" }
  default:
    return state
  }
}
