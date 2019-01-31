export const addCategory = (newCategory) => {
  return { type: "budget/ADD_CATEGORY", payload: newCategory }
}

export const categoriesFetched = (collection) => {
  return { type: "budget/CATEGORIES_FETCHED", payload: collection }
}

export const monthlyFetched = (response) => {
  return { type: "budget/MONTHLY_FETCHED", payload: response }
}

export const updateNewCategory = (payload) => {
  return { type: "budget/UPDATE_NEW_CATEGORY", payload: payload }
}

export const weeklyFetched = (response) => {
  return { type: "budget/WEEKLY_FETCHED", payload: response }
}
