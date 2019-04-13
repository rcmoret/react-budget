const initialNew = {
  to_account_id: null,
  from_account_id: null,
  amount: "",
}

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
  newTransfer: initialNew,
}

export default (state = initialState, action) => {
  switch(action.type) {
  case "transfers/CREATED":
    return {
      ...state,
      collection: [...state.collection, action.payload],
      metadata: {
        ...state.metadata,
        total: (state.metadata.total + 1),
        viewing: [state.metadata.viewing[0], (state.metadata.viewing[1] + 1)]
      },
      newTransfer: initialNew,
    }
  case "transfers/DELETED":
    return {
      ...state,
      collection: state.collection.filter(transfer => transfer.id !== action.payload),
      metadata: {
        ...state.metadata,
        total: (state.metadata.total - 1),
        viewing: [state.metadata.viewing[0], (state.metadata.viewing[1] - 1)]
      },
    }
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
  case "transfers/UPDATE_NEW":
    return {
      ...state,
      newTransfer: {
        ...state.newTransfer,
        ...action.payload
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
