const initialState = {
  metadata: {
    limit: 10,
    offset: 0,
    currentPage: 1,
    viewing: [1, 10],
    total: 999,
  },
  collection: [],
  fetchedTransfers: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
  case "transfers/FETCHED":
    return {
      ...state,
      collection: action.payload.transfers,
      fetchedTransfers: true,
      metadata: {
        ...state.metadata,
        ...action.payload.metadata,
      }
    }
  case "transfers/UPDATE_PAGE":
    return {
      ...state,
      fetchedTransfers: false,
      metadata: {
        ...state.metadata,
        currentPage: action.payload.currentPage,
      }
    }
  default:
    return state
  }
}
