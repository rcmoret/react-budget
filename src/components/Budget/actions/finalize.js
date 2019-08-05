export const addFinalizeItem = (payload) => (
  { type: "budget/finalize/ADD_FINALIZE_ITEM", payload: payload }
)

export const baseMonthFetch = (payload) => (
  { type: "budget/finalize/BASE_MONTH_FETCH", payload: payload }
)

export const editBaseAmount = (payload) => (
  { type: "budget/finalize/EDIT_BASE_AMOUNT", payload: payload }
)

export const markIntervalClosed = (
  { type: "budget/finalize/MARK_INTERVAL_CLOSED", payload: null }
)

export const markSelected = (payload) => (
  { type: "budget/finalize/MARK_SELECTED", payload: payload }
)

export const nextMonthFetch = (payload) => (
  { type: "budget/finalize/NEXT_MONTH_FETCH", payload: payload }
)

export const setStatus = (payload) => (
  { type: "budget/finalize/SET_STATUS", payload: payload }
)

export const updateExtra = (payload) => (
  { type: "budget/finalize/UPDATE_EXTRA", payload: payload }
)

export const updateFinalizeItem = (payload) => (
  { type: "budget/finalize/UPDATE_FINALIZE_ITEM", payload: payload }
)

export const updateSelectedFromAccountId = (payload) => (
  { type: "budget/finalize/UPDATE_SELECTED_FROM_ACCOUNT_ID", payload: payload }
)

export const updateSelectedToAccountId = (payload) => (
  { type: "budget/finalize/UPDATE_SELECTED_TO_ACCOUNT_ID", payload: payload }
)
