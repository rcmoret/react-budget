const initialState = { collection: [] }

export default (state = initialState, action) => {
  switch (action.type) {
    case 'accounts/FETCHED':
      return { ...state, collection: action.payload }
    default:
      return state
  }
}
