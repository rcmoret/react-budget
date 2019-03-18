export const created = (payload) => {
  return { type: "icons/CREATED", payload: payload }
}

export const deleted = (id) => {
  return { type: "icons/DELETED", payload: id }
}

export const fetched = (response) => {
  return { type: "icons/FETCHED", payload: response }
}

export const resetIcon = ({ id }) => {
  return { type: "icons/RESET", payload: { id: id } }
}

export const resetNew = () => {
  return { type: "icons/RESET_NEW", payload: null }
}

export const update = (payload) => {
  return { type: "icons/UPDATE", payload: payload }
}

export const updateNew = (payload) => {
  return { type: "icons/UPDATE_NEW", payload: payload }
}

export const updateProps = (payload) => {
  return { type: "icons/UPDATE_PROPS", payload: payload }
}

export const updated = (payload) => {
  return { type: "icons/UPDATED", payload: payload }
}
