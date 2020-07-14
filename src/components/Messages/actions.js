export const addApiError = error => ({ type: "messages/ADD_API_ERROR", payload: error })

export const removeApiError = errorMessage => ({ type: "messages/REMOVE_API_ERROR", payload: errorMessage })
