const initialState = {
  categories: { collection: [] },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "budget/CATEGORIES_FETCHED":
      return { ...state, categories: { collection: action.payload } }
    default:
      return state
  }
}
