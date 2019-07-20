export const accrualMaturityIntervalsFetched = (payload) => {
  return { type: "budget/categories/MATURITY_INTERVALS_FETCHED", payload: payload }
}

export const applyFilter = (payload) => {
  return { type: "budget/categories/APPLY_FILTER", payload: payload }
}

export const created = (payload) => {
  return { type: "budget/categories/CREATED", payload: payload }
}

export const deleted = (payload) => {
  return { type: "budget/categories/DELETED", payload: payload }
}

export const editMaturityInterval = (payload) => {
  return { type: "budget/categories/EDIT_MATURITY_INTERVAL", payload: payload }
}

export const errorsOnNew = (payload) => {
  return { type: "budget/categories/ERRORS_ON_NEW", payload: payload }
}

export const categoriesFetched = (collection) => {
  return { type: "budget/categories/FETCHED", payload: collection }
}

export const maturityIntervalCreated = (payload) => {
  return { type: "budget/categories/MATURITY_INTERVAL_CREATED", payload: payload }
}

export const removeMaturityInterval = (payload) => {
  return { type: "budget/category/REMOVE_MATURITY_INTERVAL", payload: payload }
}

export const reset = ({ id }) => {
  return { type: "budget/categories/RESET", payload: { id: id, showForm: false } }
}

export const resetNewForm = () => {
  return { type: "budget/categories/RESET_NEW_FORM", payload: null }
}

export const toggleMaturityIntervalEditForm = (payload) => {
  return { type: "budget/categories/TOGGLE_MATURITY_INTERVAL_EDIT_FORM", payload: payload }
}

export const toggleNewForm = (payload) => {
  return { type: "budget/categories/TOGGLE_NEW_FORM", payload: payload }
}

export const update = (payload) => {
  return { type: "budget/categories/UPDATE", payload: payload }
}

export const updated = (payload) => {
  return { type: "budget/categories/UPDATED", payload: payload }
}

export const updateMaturityInterval = (payload) => {
  return { type: "budget/categories/UPDATE_MATURITY_INTERVAL", payload: payload }
}

export const updateProps = (payload) => {
  return { type: "budget/categories/UPDATE_PROPS", payload: payload }
}

export const updateNew = (payload) => {
  return { type: "budget/categories/UPDATE_NEW", payload: payload }
}
