import { addErrorMessages, addEvent } from "../components/Messages/actions"
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
  const context = { verb: "GET", url: url, onSuccess: onSuccess, onFailure: onFailure, body: {} }
  fetch(url)
    .then(response => responseHandler(response, context))
}

export const deleteRequest = (url, event, onSuccess) => {
  const context = { verb: "DELETE", url: url, onSuccess: onSuccess, onFailure: defaultOnFailure, body: {} }
  fetch(url, { method: "delete" })
    .then(response => responseHandler(response, context, event))
}

export const post = (url, body, context) => {
  call(url, "POST", body, { event: () => "", ...context})
}

export const put = (url, body, context) => {
  call(url, "PUT", body, context)
}

const call = (url, verb, body, { onSuccess, onFailure, event }) => {
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
    .then(response => responseHandler(response, context, event))
}

const responseHandler = (response, context, event) => {
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
  } else if (response.status === 204) {
    response.text()
      .then(() => {
        onSuccess()
        dispatch(addEvent(event()))
      })
  } else {
    response.json()
      .then(data => {
        onSuccess(data)
        if (context.verb !== "GET") {
          dispatch(addEvent(event(data)))
        }
        dispatch(apiStatusUpdated({ status: response.status }))
      })
  }
}
