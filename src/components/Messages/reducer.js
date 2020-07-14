const initialState = {
  errors: {
    api: [],
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
  case "messages/ADD_API_ERROR":
    return {
      ...state,
      errors: {
        ...state.errors,
        api: [...new Set([...state.errors.api, action.payload])],
      },
    }
  case "messages/REMOVE_API_ERROR":
    return {
      ...state,
      errors: {
        ...state.errors,
        api: state.errors.api.filter(error => error.status !== action.payload.status),
      },
    }
  default:
    return state
  }
}
