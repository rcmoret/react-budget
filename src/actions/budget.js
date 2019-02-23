export const addCategory = (newCategory) => {
  return { type: "budget/ADD_CATEGORY", payload: newCategory }
}

export const addMonthlyItem = (payload) => {
  return { type: "budget/ADD_MONTHLY_ITEM", payload: payload }
}

export const addWeeklyItem = (payload) => {
  return { type: "budget/ADD_WEEKLY_ITEM", payload: payload }
}

export const categoriesFetched = (collection) => {
  return { type: "budget/CATEGORIES_FETCHED", payload: collection }
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

export const fetchedDiscretionaryTransactions = (payload) => {
  return { type: "budget/FETCHED_DISCRETIONARY_TRANSACTIONS", payload: payload }
}

export const fetchedWeeklyTransactions = (payload) => {
  return { type: "budget/FETCHED_WEEKLY_TRANSACTIONS", payload: payload }
}

export const itemsFetched = (response) => {
  return { type: "budget/ITEMS_FETCHED", payload: response }
}

export const monthlyFetched = (response) => {
  return { type: "budget/MONTHLY_FETCHED", payload: response }
}

export const removeMonthlyItem = ({ id }) => {
  return { type: "budget/REMOVE_MONTHLY_ITEM", payload: id }
}

export const removeWeeklyItem = ({ id }) => {
  return { type: "budget/REMOVE_WEEKLY_ITEM", payload: id }
}

export const toggleDiscretionaryDetail = (payload) => {
  return { type: "budget/TOGGLE_DISCRETIONARY_DETAIL", payload: payload }
}

export const toggleMonthlyItemForm = (payload) => {
  return { type: "budget/TOGGLE_MONTHLY_ITEM_FORM", payload: payload }
}

export const toggleWeeklyItemForm = (payload) => {
  return { type: "budget/TOGGLE_WEEKLY_ITEM_FORM", payload: payload }
}

export const updateNewCategory = (payload) => {
  return { type: "budget/UPDATE_NEW_CATEGORY", payload: payload }
}

export const updateMonthlyItem = (payload) => {
  return { type: "budget/UPDATE_MONTHLY_ITEM", payload: payload }
}

export const updateWeeklyItem = (payload) => {
  return { type: "budget/UPDATE_WEEKLY_ITEM", payload: payload }
}

export const weeklyFetched = (response) => {
  return { type: "budget/WEEKLY_FETCHED", payload: response }
}
