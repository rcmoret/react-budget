import { updateItemInCollection } from "./shared"
import objectifyDiscretionary from "../shared/models/discretionary"
import objectifyMonthly from "../shared/models/monthlyBudgetItem"
import objectifyWeekly from "../shared/models/weeklyBudgetItem"

const initialState = {
  discretionary: {
    balance: 0,
    spent: 0,
    total_remaining: 0,
    days_remaining: 1,
    total_days: 1,
    collection: [],
  },
  categories: { collection: [] },
  monthly: [],
  weekly: [],
  newCategory: { name: "", default_amount: "", showForm: false },
  itemsFetched: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
  case "budget/ADD_CATEGORY":
    return { ...state, categories: { collection: [...state.categories.collection, action.payload ] } }
  case "budget/CATEGORIES_FETCHED":
    return { ...state, categories: { collection: action.payload } }
  case "budget/EDIT_MONTHLY_ITEM":
    return {
      ...state,
      monthly: updateItemInCollection({
        updatedItem: action.payload,
        collection: state.monthly,
        save: false
      })
    }
  case "budget/EDIT_WEEKLY_ITEM":
    return {
      ...state,
      weekly: updateItemInCollection({
        updatedItem: action.payload,
        collection: state.weekly,
        save: false
      })
    }
  case "budget/FETCHED_DISCRETIONARY":
    return {
      ...state,
      discretionary: objectifyDiscretionary(action.payload, state)
    }
  case "budget/FETCHED_DISCRETIONARY_TRANSACTIONS":
    return {
      ...state,
      discretionary: {
        ...state.discretionary,
        fetchedTransactions: true,
        collection: action.payload,
      },
    }
  case "budget/FETCHED_WEEKLY_TRANSACTIONS":
    return {
      ...state,
      weekly: updateItemInCollection({
        updatedItem: { id: action.payload.id, collection: action.payload.collection },
        collection: state.weekly,
        save: false
      })
    }
  case "budget/ITEMS_FETCHED":
    return {
      ...state,
      discretionary: objectifyDiscretionary(action.payload.metadata, state),
      monthly: action.payload.collection
        .filter(item => item.monthly)
        .map(item => objectifyMonthly(item)),
      weekly: action.payload.collection
        .filter(item => !item.monthly)
        .map(item => objectifyWeekly(item, action.payload.metadata)),
      itemsFetched: true,
    }
  case "budget/WEEKLY_FETCHED":
    return {
      ...state,
      weekly: {
        collection: action.payload.map(item => objectifyWeekly(item))
      }
    }
  case "budget/TOGGLE_DISCRETIONARY_DETAIL":
    return { ...state, discretionary: { ...state.discretionary, ...action.payload } }
  case "budget/UPDATE_DISCRETIONARY":
    return {
      ...state,
      discretionary: objectifyDiscretionary(state.discretionary, state)
    }
  case "budget/UPDATE_NEW_CATEGORY":
    return { ...state, newCategory: { ...state.newCategory, ...action.payload } }
  case "budget/UPDATE_MONTHLY_ITEM":
    const monthlyItem = state.monthly.find(item => item.id === action.payload.id)
    const updatedMonthlyItem = objectifyMonthly({...monthlyItem, ...action.payload })
    return {
      ...state,
      monthly: updateItemInCollection({
        updatedItem: updatedMonthlyItem,
        collection: state.monthly,
        save: true
      })
    }
  case "budget/UPDATE_WEEKLY_ITEM": {
    const weeklyItem = state.weekly.find(item => item.id === action.payload.id)
    const updatedWeeklyItem = objectifyWeekly({ ...weeklyItem, ...action.payload }, state.discretionary)
    return {
      ...state,
      weekly: updateItemInCollection({
        updatedItem: updatedWeeklyItem,
        collection: state.weekly,
        save: true
      })
    }
  }
  default:
    return state
  }
}
