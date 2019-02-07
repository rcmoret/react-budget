export const addCategory = (newCategory) => {
  return { type: "budget/ADD_CATEGORY", payload: newCategory }
}

export const categoriesFetched = (collection) => {
  return { type: "budget/CATEGORIES_FETCHED", payload: collection }
}

export const editMonthlyItem = (payload) => {
  return { type: "budget/EDIT_MONTHLY_ITEM", payload: payload }
}

export const editWeeklyItem = (payload) => {
  return { type: "budget/EDIT_WEEKLY_ITEM", payload: payload }
}

export const fetchedDiscretionary = (payload) => {
  return { type: "budget/FETCHED_DISCRETIONARY", payload: payload }
}

export const fetchedDiscretionaryTransactions = (payload) => {
  return { type: "budget/FETCHED_DISCRETIONARY_TRANSACTIONS", payload: payload }
}

export const monthlyFetched = (response) => {
  return { type: "budget/MONTHLY_FETCHED", payload: response }
}

export const toggleDiscretionaryDetail = (payload) => {
  return { type: "budget/TOGGLE_DISCRETIONARY_DETAIL", payload: payload }
}

export const updateDiscretionary = (payload) => {
  return { type: "budget/UPDATE_DISCRETIONARY", payload: payload }
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
