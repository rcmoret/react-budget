export const created = (payload) => {
  return { type: "transfers/CREATED", payload: payload }
}

export const deleted = (payload) => {
  return { type: "transfers/DELETED", payload: payload }
}

export const fetched = (payload) => {
  return { type: "transfers/FETCHED", payload: payload }
}

export const updateNew = (payload) => {
  return { type: "transfers/UPDATE_NEW", payload: payload }
}

export const updatePage = (payload) => {
  return { type: "transfers/UPDATE_PAGE", payload: { currentPage: payload } }
}
