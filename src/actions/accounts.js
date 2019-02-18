export const addNew = (newAccount) => {
  return { type: "accounts/ADD_NEW", payload: newAccount }
}

export const deletedAccount = (payload) => {
  return { type: "accounts/DELETED_ACCOUNT", payload: payload }
}

export const editItem = (payload) => {
  return { type: "accounts/EDIT_ITEM", payload: payload }
}

export const fetchedAccounts = (accounts) => {
  return { type: "accounts/FETCHED", payload: accounts }
}

export const resetForm = () => {
  return { type: "accounts/RESET_FORM", payload: null }
}

export const toggleShowNewForm = ({ showForm }) => {
  return { type: "accounts/TOGGLE_SHOW_NEW_FORM", payload: showForm }
}

export const updateItem = (item) => {
  return { type: "accounts/UPDATE_ITEM", payload: item }
}

export const updateNew = (payload) => {
  return { type: "accounts/UPDATE_NEW", payload: payload }
}
