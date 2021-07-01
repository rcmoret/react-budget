export const addErrorMessages = error => ({ type: "messages/ADD_ERROR_MESSAGES", payload: error })

export const addEvents = events => ({ type: "messages/ADD_EVENTS", payload: events })

export const removeErrorMessage = errorMessage => ({ type: "messages/REMOVE_ERROR_MESSAGE", payload: errorMessage })

export const toggleEvents = () => ({ type: "messages/TOGGLE_EVENTS", payload: null })
