export const addErrorMessages = error => ({ type: "messages/ADD_ERROR_MESSAGES", payload: error })

export const removeErrorMessage = errorMessage => ({ type: "messages/REMOVE_ERROR_MESSAGE", payload: errorMessage })
