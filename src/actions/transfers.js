export const fetched = (payload) => {
  return { type: "transfers/FETCHED", payload: payload }
}

export const updatePage = (payload) => {
  return { type: "transfers/UPDATE_PAGE", payload: { currentPage: payload } }
}
