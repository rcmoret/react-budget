import { addErrorMessages } from "../components/Messages/actions"
import { apiStatusUpdated } from "../components/Api/actions"

import { dispatch } from "../store"

const defaultOnFailure = (data, { body, status, url }) => {
  const action = addErrorMessages({
    requestBody: body,
    errors: data.errors,
    status: status,
    url: url,
  })
  dispatch(action)
}

export const get = (url, onSuccess, onFailure) => {
  const context = { url: url, onSuccess: onSuccess, onFailure: onFailure, body: {} }
  fetch(url)
    .then(response => responseHandler(response, context))
}

export const post = (url, body, onSuccess, onFailure) => {
  call(url, "POST", body, onSuccess, onFailure)
}

export const put = (url, body,  onSuccess, onFailure) => {
  call(url, "PUT", body, onSuccess, onFailure)
}

const call = (url, verb, body, onSuccess, onFailure) => {
  const context = {
    body: body,
    onSuccess: onSuccess,
    onFailure: (onFailure || defaultOnFailure),
    url: url,
    verb: verb,
  }

  fetch(url, {
    method: verb,
    body: body,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(response => responseHandler(response, context))
}

const responseHandler = (response, context) => {
  const { body, onSuccess, onFailure, url } = context

  if (response.status === 401 || response.status === 404) {
    response.json()
      .then(data => {
        dispatch(apiStatusUpdated({ status: response.status }))
        defaultOnFailure(data, { body: body, status: response.status, url: url })
      })
  } else if (!response.ok) {
    response.json()
      .then(data => {
        dispatch(apiStatusUpdated({ status: response.status }))
        onFailure(data, { body: body, status: response.status, url: url })
      })
  } else {
    response.json()
      .then(data => {
        dispatch(apiStatusUpdated({ status: response.status }))
        onSuccess(data)
      })
  }
}
