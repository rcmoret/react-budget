import API_URL from "../constants/Api"

import { getState } from "../store"

const ApiUrlBuilder = (options = {}) => {
  const { route } = options
  const query = { ...options.query, key: apiKey }
  const state = getState()
  const { apiKey } = state.apiKey
  const path = pathTo(route, options)
  const queryString = Object
    .entries(query)
    .map(arr => arr.join("="))
    .join("&")

  if (queryString === "") {
    return `${API_URL}/${path}`
  } else {
    return `${API_URL}/${path}?${queryString}`
  }
}

const pathTo = (route, options) => {
  switch(route) {
  case "accounts-index":
    return "accounts"
  case "account-show":
    return `accounts/${options.id}`
  case "budget-categories-index":
    return "budget/categories"
  case "budget-category-show":
    return `budget/categories/${options.id}`
  case "budget-category-items-index":
    return `budget/categories/${options.id}/items`
  case "budget-category-maturity-intervals-index":
    return `budget/categories/${options.budgetCategoryId}/maturity_intervals`
  case "budget-category-maturity-interval-show":
    return `budget/categories/${options.budgetCategoryId}/maturity_intervals/${options.id}`
  case "budget-items-index":
    return "budget/items"
  case "budget-item-show":
    return `budget/categories/${options.budgetCategoryId}/items/${options.id}`
  case "budget-item-transactions-index":
    return `/budget/categories/${options.budgetCategoryId}/items/${options.id}/transactions`
  case "discretionary-transactions-index":
    return "budget/discretionary/transactions"
  case "icons-index":
    return "icons"
  case "icon-show":
    return `icons/${options.id}`
  case "interval-show":
    return `intervals/${options.month}/${options.year}`
  case "transactions-index":
    return `accounts/${options.accountId}/transactions`
  case "transaction-show":
    return `accounts/${options.accountId}/transactions/${options.id}`
  case "transfers-index":
    return "transfers"
  case "transfer-show":
    return `transfers/${options.id}`
  default:
    return ""
  }
}

export default ApiUrlBuilder
