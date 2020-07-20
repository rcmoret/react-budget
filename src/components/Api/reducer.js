const initialState = {
  key: null,
  keyFormInput: "",
  status: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
  case "api/KEY_EDITED":
    return { ...state, keyFormInput: action.payload.key }
  case "api/STATUS_UPDATED":
    return { ...state, status: action.payload.status }
  case "api/KEY_UPDATED":
    return { ...state, key: action.payload.key, status: null }
  default:
    return state
  }
}
