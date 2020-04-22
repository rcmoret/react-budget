export const addDetailToEntry = (payload) => (
  {
    type: "transactions/ADD_DETAIL_TO_ENTRY",
    payload: payload,
  }
)

export const addDetailToNew = () => {
  return { type: "transactions/ADD_DETAIL_TO_NEW", payload: null }
}
export const created = (payload) => {
  return { type: "transactions/CREATED", payload: payload }
}

export const deleteTransaction = (payload) => {
  return { type: "transactions/DELETED", payload: payload }
}

export const edit = (payload) => {
  return { type: "transactions/EDIT", payload: payload }
}

export const editDetailProps = (payload) => {
  return { type: "transactions/EDIT_DETAIL_PROPS", payload: payload }
}

export const editFormOptions = (payload) => (
  { type: "transactions/EDIT_FORM_OPTIONS", payload: payload }
)

export const editNewFormOptions = (payload) => (
  { type: "transactions/EDIT_NEW_FORM_OPTIONS", payload: payload }
)

export const editProps = (payload) => {
  return { type: "transactions/EDIT_PROPS", payload: payload }
}

export const fetchedTransactions = (response) => {
  return { type: "transactions/FETCHED", payload: response }
}

export const fetchedBudgetItems = (response) => {
  return { type: "transactions/FETCHED_BUDGET_ITEMS", payload: response }
}

export const resetNew = (payload) => {
  return { type: "transactions/RESET_NEW", payload: payload }
}

export const toggleEditForm = ({ id }) => (
  { type: "transactions/TOGGLE_EDIT_FORM", payload: id }
)

export const toggleNewForm = () => (
  { type: "transactions/TOGGLE_NEW_FORM", payload: null }
)

export const updateNew = (payload) => {
  return { type: "transactions/UPDATE_NEW", payload: payload }
}

export const updateNewDetail = (payload) => {
  return { type: "transactions/UPDATE_NEW_DETAIL", payload: payload }
}

export const updated = (payload) => {
  return { type: "transactions/UPDATED", payload: payload }
}
