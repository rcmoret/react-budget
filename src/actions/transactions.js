export const addSubtransaction = (payload) => {
  return { type: "transactions/ADD_SUBTRANSACTION", payload: payload }
}

export const addSubtransactions = (payload) => {
  return { type: "transactions/ADD_SUBTRANSACTIONS", payload: payload }
}

export const createTransaction = (payload) => {
  return { type: "transactions/CREATE_TRANSACTION", payload: payload }
}

export const editNew = (payload) => {
  return { type: "transactions/EDIT_NEW", payload: payload }
}

export const editSubtransaction = (payload) => {
  return { type: "transactions/EDIT_SUBTRANSACTION", payload: payload }
}

export const fetchedBudgetItems = (response) => {
  return { type: "transactions/FETCHED_BUDGET_ITEMS", payload: response }
}

export const fetchedTransactions = (response) => {
  return { type: "transactions/FETCHED", payload: response }
}

export const removeSubtransaction = (payload) => {
  return { type: "transactions/REMOVE_SUBTRANSACTION", payload: payload }
}

export const resetForm = () => {
  return { type: "transactions/RESET_FORM", payload: null }
}

export const toggleForm = (payload) => {
  return { type: "transactions/TOGGLE_FORM", payload: payload }
}
