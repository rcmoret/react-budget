export const addSubtransactionToNew = () => {
  return { type: "transactions/ADD_SUBTRANSACTION_TO_NEW", payload: null }
}

export const created = (payload) => {
  return { type: "transactions/CREATED", payload: payload }
}

export const fetchedTransactions = (response) => {
  return { type: "transactions/FETCHED", payload: response }
}

export const fetchedBudgetItems = (response) => {
  return { type: "transactions/FETCHED_BUDGET_ITEMS", payload: response }
}

export const resetNew = () => {
  return { type: "transactions/RESET_NEW", payload: null }
}

export const updateNew = (payload) => {
  return { type: "transactions/UPDATE_NEW", payload: payload }
}
export const updateNewSubtransaction = (payload) => {
  return { type: "transactions/UPDATE_NEW_SUBTRANSACTION", payload: payload }
}
