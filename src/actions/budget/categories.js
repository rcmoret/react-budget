export const created = (payload) => {
  return { type: "budget/categories/CREATED", payload: payload }
}

export const resetNewForm = () => {
  return { type: "budget/categories/RESET_NEW_FORM", payload: null }
}

export const updateNew = (payload) => {
  return { type: "budget/categories/UPDATE_NEW", payload: payload }
}
