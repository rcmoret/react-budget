export const addCategory = (newCategory) => {
  return { type: "budget/ADD_CATEGORY", payload: newCategory }
}

export const addFieldToItemsAdjust = payload => (
  { type: "budget/ADD_FIELD_TO_ITEMS_ADJUST", payload: payload }
)

export const addMonthlyItem = (payload) => {
  return { type: "budget/ADD_MONTHLY_ITEM", payload: payload }
}

export const addWeeklyItem = (payload) => {
  return { type: "budget/ADD_WEEKLY_ITEM", payload: payload }
}

export const adjustItemFormSubmit = payload => (
  { type: "budget/ADJUST_ITEM_FORM_SUBMIT", payload: payload }
)

export const baseMonthFetched = (payload) => {
  return { type: "budget/BASE_MONTH_FETCHED", payload: payload }
}

export const changeItemSortOrder = (payload) => {
  return { type: "budget/CHANGE_ITEM_SORT_ORDER", payload: payload }
}

export const editMonthlyItem = (payload) => {
  return { type: "budget/EDIT_MONTHLY_ITEM", payload: payload }
}

export const editNewMonthlyItem = (payload) => {
  return { type: "budget/EDIT_NEW_MONTHLY_ITEM", payload: payload }
}

export const editNewWeeklyItem = (payload) => {
  return { type: "budget/EDIT_NEW_WEEKLY_ITEM", payload: payload }
}

export const editWeeklyItem = (payload) => {
  return { type: "budget/EDIT_WEEKLY_ITEM", payload: payload }
}

export const fetchedMonthlyBudgetItemEvents = payload => (
  { type: "budget/FETCHED_MONTHLY_BUDGET_ITEM_EVENTS", payload: payload }
)

export const fetchedWeeklyBudgetItemEvents = payload => (
  { type: "budget/FETCHED_WEEKLY_BUDGET_ITEM_EVENTS", payload: payload }
)

export const fetchedDiscretionaryTransactions = (payload) => {
  return { type: "budget/FETCHED_DISCRETIONARY_TRANSACTIONS", payload: payload }
}

export const fetchedMonthlyTransactions = (payload) => {
  return { type: "budget/FETCHED_MONTHLY_TRANSACTIONS", payload: payload }
}

export const fetchedWeeklyTransactions = (payload) => {
  return { type: "budget/FETCHED_WEEKLY_TRANSACTIONS", payload: payload }
}

export const itemsFetched = (response) => {
  return { type: "budget/ITEMS_FETCHED", payload: response }
}

export const newMonthFetched = (payload) => {
  return { type: "budget/NEW_MONTH_FETCHED", payload: payload }
}

export const removeAdjustFormCategory = payload => (
  { type: "budget/REMOVE_ADJUST_FORM_CATEGORY", payload: payload }
)

export const removeAdjustFormItem = payload => (
  { type: "budget/REMOVE_ADJUST_FORM_ITEM", payload: payload }
)

export const removeMonthlyItem = ({ id }) => {
  return { type: "budget/REMOVE_MONTHLY_ITEM", payload: id }
}

export const removeWeeklyItem = ({ id }) => {
  return { type: "budget/REMOVE_WEEKLY_ITEM", payload: id }
}

export const toggleAccrualItems = (payload) => {
  return { type: "budget/TOGGLE_CLEARED_ITEMS", payload: payload }
}

export const toggleAdjustItemsForm = () => (
  { type: "budget/TOGGLE_ADJUST_ITEM_FORM", payload: null }
)

export const toggleClearedItems = (payload) => {
  return { type: "budget/TOGGLE_CLEARED_ITEMS", payload: payload }
}

export const toggleDiscretionaryDetail = (payload) => {
  return { type: "budget/TOGGLE_DISCRETIONARY_DETAIL", payload: payload }
}

export const toggleMenu = (payload) => {
  return { type: "budget/TOGGLE_MENU", payload: payload }
}

export const toggleMonthlyItemForm = (payload) => {
  return { type: "budget/TOGGLE_MONTHLY_ITEM_FORM", payload: payload }
}

export const toggleWeeklyItemForm = (payload) => {
  return { type: "budget/TOGGLE_WEEKLY_ITEM_FORM", payload: payload }
}

export const updateAdjustFormCategory = payload => (
  { type: "budget/UPDATE_ADJUST_FORM_CATEGORY", payload: payload }
)

export const updateAdjustFormItem = payload => (
  { type: "budget/UPDATE_ADJUST_FORM_ITEM", payload: payload }
)

export const updatedItemAdjustSelectedValue = payload => (
  { type: "budget/UPDATED_ITEM_ADJUST_SELECTED_VALUE", payload: payload }
)

export const updateMonthlyItem = (payload) => {
  return { type: "budget/UPDATE_MONTHLY_ITEM", payload: payload }
}

export const updateWeeklyItem = (payload) => {
  return { type: "budget/UPDATE_WEEKLY_ITEM", payload: payload }
}
