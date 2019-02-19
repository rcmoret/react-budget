const initialState = {
  collection: [],
  fetched: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case "icons/FETCHED":
      return {
        ...state,
        collection: action.payload,
        fetched: true,
      }
    default:
      return state
  }
}
