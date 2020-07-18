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
        api: includeApiError(state, action.payload),
        // [...new Set([...state.errors.api, action.payload])],
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

const includeApiError = (state, payload) => {
  const existingErrors = state.errors.api

  const unauthorziedErrors = existingErrors.filter(error => error.status === 401)
  const matchingMessages = existingErrors.filter(error => error.status === payload.status && error.message === payload.message)

  if (payload.status === 401 && unauthorziedErrors.length > 0) {
    return existingErrors
  } else if (matchingMessages.length > 0) {
    return existingErrors
  } else {
    return [
      payload,
      ...existingErrors,
    ]
  }
}
