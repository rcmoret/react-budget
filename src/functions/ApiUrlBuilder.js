import API_URL from "../constants/Api"

import { getState } from "../store"

const ApiUrlBuilder = (options = {}) => {
  const { route } = options
  const state = getState()
  const query = { ...options.query, key: state.api.key }
  const path = pathTo(route, options)
  const queryParams = Object
    .entries(query)
    .map(arr => arr.join("="))
    .join("&")
  const queryString = queryParams === "" ? "" : `?${queryParams}`

  return `${API_URL}/${path}${queryString}`
}

const pathTo = (route, options) => {
  switch(route) {
  case "accounts-index":
    return "api/accounts"
  case "account-show":
    return `api/accounts/${options.id}`
  case "budget-categories-index":
    return "api/budget/categories"
  case "budget-category-show":
    return `api/budget/categories/${options.id}`
  case "budget-category-items-index":
    return `api/budget/categories/${options.id}/items`
  case "budget-category-maturity-intervals-index":
    return `api/budget/categories/${options.budgetCategoryId}/maturity_intervals`
  case "budget-category-maturity-interval-show":
    return `api/budget/categories/${options.budgetCategoryId}/maturity_intervals/${options.id}`
  case "budget-items-index":
    return "api/budget/items"
  case "budget-items-events-index":
    return "api/budget/items/events"
  case "budget-item-show":
    return `api/budget/categories/${options.budgetCategoryId}/items/${options.id}`
  case "budget-item-events-index":
    return `api/budget/categories/${options.budgetCategoryId}/items/${options.id}/events`
  case "budget-item-transactions-index":
    return `api/budget/categories/${options.budgetCategoryId}/items/${options.id}/transactions`
  case "discretionary-transactions-index":
    return "api/budget/discretionary/transactions"
  case "icons-index":
    return "api/icons"
  case "icon-show":
    return `api/icons/${options.id}`
  case "interval-show":
    return `api/intervals/${options.month}/${options.year}`
  case "transactions-index":
    return `api/accounts/${options.accountId}/transactions`
  case "transaction-show":
    return `api/accounts/${options.accountId}/transactions/${options.id}`
  case "transfers-index":
    return "api/transfers"
  case "transfer-show":
    return `api/transfers/${options.id}`
  default:
    return "api"
  }
}

export default ApiUrlBuilder
