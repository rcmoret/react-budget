const initialState = {
  apiKey: "",
  newApiKey: ""
}

export default (state = initialState, action) => {
  switch(action.type) {
  case "api/KEY_EDITED":
    return { ...state, newApiKey: action.payload.key }
  case "key/UPDATED":
    return { ...state, apiKey: action.payload.key, newApiKey: "" }
  default:
    return state
  }
}
