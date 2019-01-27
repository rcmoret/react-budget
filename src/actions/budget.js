export const categoriesFetched = (collection) => {
  return { type: "budget/CATEGORIES_FETCHED", payload: collection }
}

export const monthlyFetched = (response) => {
  return { type: "budget/MONTHLY_FETCHED", payload: response }
}

export const weeklyFetched = (response) => {
  return { type: "budget/WEEKLY_FETCHED", payload: response }
}
