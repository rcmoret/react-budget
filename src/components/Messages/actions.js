export const addErrorMessages = error => ({ type: "messages/ADD_ERROR_MESSAGES", payload: error })

export const addEvent = event => ({ type: "messages/ADD_EVENT", payload: event })

export const removeErrorMessage = errorMessage => ({ type: "messages/REMOVE_ERROR_MESSAGE", payload: errorMessage })
