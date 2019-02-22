export const created = (newAccount) => {
  return { type: "accounts/CREATED", payload: newAccount }
}

export const deleted = (payload) => {
  return { type: "accounts/DELETED", payload: payload }
}

export const fetched = (accounts) => {
  return { type: "accounts/FETCHED", payload: accounts }
}

export const resetAccount = (payload) => {
  return { type: "accounts/RESET", payload: payload }
}

export const resetForm = () => {
  return { type: "accounts/RESET_FORM", payload: null }
}

export const toggleShowNewForm = ({ showForm }) => {
  return { type: "accounts/TOGGLE_SHOW_NEW_FORM", payload: showForm }
}

export const update = (payload) => {
  return { type: "accounts/UPDATE", payload: payload }
}

export const updated = (payload) => {
  return { type: "accounts/UPDATED", payload: payload }
}

export const updateNew = (payload) => {
  return { type: "accounts/UPDATE_NEW", payload: payload }
}

export const updateProps = (payload) => {
  return { type: "accounts/UPDATE_PROPS", payload: payload }
}
