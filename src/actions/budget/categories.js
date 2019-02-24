export const created = (payload) => {
  return { type: "budget/categories/CREATED", payload: payload }
}

export const reset = ({ id }) => {
  return { type: "budget/categories/RESET", payload: { id: id, showForm: false } }
}

export const resetNewForm = () => {
  return { type: "budget/categories/RESET_NEW_FORM", payload: null }
}

export const update = (payload) => {
  return { type: "budget/categories/UPDATE", payload: payload }
}

export const updated = (payload) => {
  return { type: "budget/categories/UPDATED", payload: payload }
}

export const updateProps = (payload) => {
  return { type: "budget/categories/UPDATE_PROPS", payload: payload }
}

export const updateNew = (payload) => {
  return { type: "budget/categories/UPDATE_NEW", payload: payload }
}
