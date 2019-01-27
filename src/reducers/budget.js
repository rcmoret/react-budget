const initialState = {
  categories: { collection: [] },
  monthly: { collection: [] },
  weekly: { collection: [] },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "budget/CATEGORIES_FETCHED":
      return { ...state, categories: { collection: action.payload } }
    case "budget/MONTHLY_FETCHED":
      return { ...state, monthly: { collection: action.payload } }
    case "budget/WEEKLY_FETCHED":
      return { ...state, weekly: { collection: action.payload } }
    default:
      return state
  }
}
