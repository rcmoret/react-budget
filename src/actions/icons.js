export const createIcon = (payload) => {
  return { type: "icons/CREATE", payload: payload }
}

export const editNewIcon = (payload) => {
  return { type: "icons/EDIT_NEW", payload: payload }
}

export const iconsFetched = (response) => {
  return { type: "icons/FETCHED", payload: response }
}
