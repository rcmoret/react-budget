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
  categories: { collection: [], fetch: false },
  monthly: {
    collection: [],
    showForm: false,
    newItem: {
      amount: "",
      budget_category_id: null,
    },
  },
  weekly: {
    collection: [],
    showForm: false,
    newItem: {
      amount: "",
      budget_category_id: null,
    },
  },
  newCategory: { name: "", default_amount: "", showForm: false },
  itemsFetched: false,
  metadata: {
    month: 12,
    year: 2099,
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
  case "budget/ADD_CATEGORY":
    return { ...state, categories: { collection: [...state.categories.collection, action.payload ] } }
  case "budget/ADD_MONTHLY_ITEM":
    return {
      ...state,
      monthly: {
        ...state.monthly,
        collection: [
          ...state.monthly.collection,
          objectifyMonthly(action.payload, state.metadata)
        ],
      },
    }
  case "budget/ADD_WEEKLY_ITEM":
    return {
      ...state,
      weekly: {
        ...state.weekly,
        collection: [
          ...state.weekly.collection,
          objectifyWeekly(action.payload, state.metadata)
        ]
      }
    }
  case "budget/CATEGORIES_FETCHED":
    return { ...state, categories: { collection: action.payload, fetched: true } }
  case "budget/EDIT_NEW_MONTHLY_ITEM":
    return {
      ...state,
      monthly: {
        ...state.monthly,
        newItem: { ...state.monthly.newItem, ...action.payload }
      }
    }
  case "budget/EDIT_NEW_WEEKLY_ITEM":
    return {
      ...state,
      weekly: {
        ...state.weekly,
        newItem: { ...state.weekly.newItem, ...action.payload }
      }
    }
  case "budget/EDIT_MONTHLY_ITEM":
    return {
      ...state,
      monthly: {
        ...state.monthly,
        collection: updateItemInCollection({
          updatedItem: action.payload,
          collection: state.monthly.collection,
          save: false
        })
      }
    }
  case "budget/EDIT_WEEKLY_ITEM":
    return {
      ...state,
      weekly: {
        ...state.weekly,
        collection: updateItemInCollection({
          updatedItem: action.payload,
          collection: state.weekly.collection,
          save: false
        })
      }
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
      weekly: {
        ...state.weekly,
        collection: updateItemInCollection({
          updatedItem: { id: action.payload.id, collection: action.payload.collection },
          collection: state.weekly.collection,
          save: false
        })
      }
    }
  case "budget/ITEMS_FETCHED":
    return {
      ...state,
      discretionary: objectifyDiscretionary(action.payload.metadata, state),
      monthly: {
        ...state.monthly,
        collection: action.payload.collection
          .filter(item => item.monthly)
          .map(item => objectifyMonthly(item)),
      },
      weekly: {
        ...state.weekly,
        collection: action.payload.collection
          .filter(item => !item.monthly)
          .map(item => objectifyWeekly(item, action.payload.metadata)),
      },
      itemsFetched: true,
      metadata: action.payload.metadata
    }
  case "budget/TOGGLE_DISCRETIONARY_DETAIL":
    return { ...state, discretionary: { ...state.discretionary, ...action.payload } }
  case "budget/TOGGLE_MONTHLY_ITEM_FORM":
    return { ...state, monthly: { ...state.monthly, ...action.payload } }
  case "budget/TOGGLE_WEEKLY_ITEM_FORM":
    return { ...state, weekly: { ...state.weekly, ...action.payload } }
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
      monthly: {
        ...state.monthly,
        collection: updateItemInCollection({
          updatedItem: updatedMonthlyItem,
          collection: state.monthly.collection,
          save: true
        })
      },
    }
  case "budget/UPDATE_WEEKLY_ITEM": {
    const weeklyItem = state.weekly.collection.find(item => item.id === action.payload.id)
    const updatedWeeklyItem = objectifyWeekly({ ...weeklyItem, ...action.payload }, state.metadata)
    return {
      ...state,
      weekly: {
        ...state.weekly,
        collection: updateItemInCollection({
          updatedItem: updatedWeeklyItem,
          collection: state.weekly.collection,
          save: true
        })
      }
    }
  }
  default:
    return state
  }
}
