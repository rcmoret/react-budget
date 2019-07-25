export const baseMonthFetch = (payload) => {
  return { type: "budget/finalize/BASE_MONTH_FETCH", payload: payload }
}

export const editBaseAmount = (payload) => {
  return { type: "budget/finalize/EDIT_BASE_AMOUNT", payload: payload }
}

export const nextMonthFetch = (payload) => {
  return { type: "budget/finalize/NEXT_MONTH_FETCH", payload: payload }
}

export const setStatus = (payload) => {
  return { type: "budget/finalize/SET_STATUS", payload: payload }
}

export const updateFinalizeItem = (payload) => {
  return { type: "budget/finalize/UPDATE_FINALIZE_ITEM", payload: payload }
}
