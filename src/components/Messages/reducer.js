import findOrDefault from "../../functions/FindOrDefault"

const apiErrors ={
  type: "api",
  messages: {},
  requests: [],
}

const initialState = {
  errors: [
    {...apiErrors},
    {
      type: "misc",
      messages: {},
      requests: [],
    },
  ],
  events: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
  case "messages/ADD_ERROR_MESSAGES":
    return {
      ...state,
      errors: updateErrors(state, action.payload),
    }
  case "messages/ADD_EVENT":
    return {
      ...state,
      events: [
        ...state.events,
        action.payload,
      ],
    }
  case "messages/REMOVE_ERROR_MESSAGE":
    return {
      ...state,
      errors: removeErrors(state, action.payload)
    }
  default:
    return state
  }
}

const emptyErrorObject = {
  messages: {},
  requests: [],
}

const updateErrors = (state, payload) => {
  const { errors } = payload
  const keysFromState = state.errors.map(err => err.type)
  const keys = errors.reduce((acc, err) => [...acc, ...Object.keys(err)], [])

  return [...new Set([...keys, ...keysFromState])].map(key => {
    const error = findOrDefault(state.errors, err => err.type === key, { type: key, ...emptyErrorObject })
    const payloadError = findOrDefault(errors, err => err.hasOwnProperty(error.type), null)

    if (payloadError === null) {
      return error
    } else {
      const errorTypeMessages = error.messages[payload.status] || []
      return {
        ...error,
        messages: {
          ...error.messages,
          [payload.status]: [...new Set([...errorTypeMessages, ...payloadError[error.type]])]
        },
        requests: [...error.requests, payload],
      }
    }
  })
}

const removeErrors = (state, payload) => {
  const { errors } = state
  const { errorMessage, status, type } = payload

  return errors.map(err => {
    if (err.type === type) {
      return {
        ...err,
        messages: {
          [status]: err.messages[status].filter(e => e !== errorMessage),
        },
      }
    } else {
      return err
    }
  })
}
