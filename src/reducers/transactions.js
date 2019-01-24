const initialState = { metadata: { date_range: ["", ""] }, collection: [] }

export default (state = initialState, action) => {
  switch(action.type) {
    case "transactions/FETCHED":
      const { metadata, transactions } = action.payload
      return { ...state, metadata: metadata, collection: transactions }
    default:
      return state
  }
}
