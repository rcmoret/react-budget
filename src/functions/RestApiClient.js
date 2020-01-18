// export const get = (url, onSuccess, onFailure) => {
//   fetch(url)
//     .then(response => responseHandler(response, onSuccess, onFailure))
// }

export const post = (url, body, onSuccess, onFailure) => {
  call(url, "POST", body, onSuccess, onFailure)
}

export const put = (url, body,  onSuccess, onFailure) => {
  call(url, "PUT", body, onSuccess, onFailure)
}

const call = (url, verb, body, onSuccess, onFailure) => {
  fetch(url, {
    method: verb,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then(response => responseHandler(response, onSuccess, onFailure))
}

const responseHandler = (response, onSuccess, onFailure) => {
  if (!response.ok) {
    response.json()
      .then(data => onFailure(data))
  } else {
    response.json()
      .then(data => onSuccess(data))
  }
}
