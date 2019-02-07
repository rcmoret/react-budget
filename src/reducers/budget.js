import { updateItemInCollection } from "./shared"

const initialState = {
  discretionary: {
    remaining: {
      remaining_budgeted: 0,
      available_cash: 0,
      charged: 0
    },
    available_cash: 0,
    spent: 0,
    over_under_budget: 0,
    collection: [],
  },
  categories: { collection: [] },
  monthly: { collection: [] },
  weekly: { collection: [] },
  newCategory: { name: '', default_amount: '', showForm: false },
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
        monthly: {
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
          collection: updateItemInCollection({
            updatedItem: action.payload,
            collection: state.weekly.collection,
            save: false
            })
        }
      }
    case "budget/FETCHED_DISCRETIONARY":
      const { available_cash, charged, remaining_budgeted } = action.payload.remaining
      const total_remaining = available_cash + charged + remaining_budgeted
      const { over_under_budget, spent } = action.payload
      const amount = total_remaining - spent - over_under_budget
      return {
        ...state,
        discretionary: {
          ...action.payload,
          total_remaining: total_remaining,
          amount: amount,
          collection: state.discretionary.collection,
        }
      }
    case "budget/FETCHED_DISCRETIONARY_TRANSACTIONS":
      return {
        ...state,
        discretionary: {
          ...state.discretionary,
          collection: action.payload,
        },
    }
    case "budget/FETCHED_WEEKLY_TRANSACTIONS":
      return {
        ...state,
        weekly: {
          collection: updateItemInCollection({
            updatedItem: { id: action.payload.id, collection: action.payload.collection },
            collection: state.weekly.collection,
            save: false
            })
        }
      }
    case "budget/MONTHLY_FETCHED":
      return { ...state, monthly: { collection: action.payload } }
    case "budget/TOGGLE_DISCRETIONARY_DETAIL":
      return { ...state, discretionary: { ...state.discretionary, ...action.payload } }
    case "budget/UPDATE_DISCRETIONARY":
      debugger
      return state
    case "budget/UPDATE_NEW_CATEGORY":
      return { ...state, newCategory: { ...state.newCategory, ...action.payload } }
    case "budget/UPDATE_MONTHLY_ITEM":
      return {
        ...state,
        monthly: {
          collection: updateItemInCollection({
            updatedItem: action.payload,
            collection: state.monthly.collection,
            save: true
            })
        }
      }
    case "budget/UPDATE_WEEKLY_ITEM":
      return {
        ...state,
        weekly: {
          collection: updateItemInCollection({
            updatedItem: action.payload,
            collection: state.weekly.collection,
            save: true
            })
        }
      }
    case "budget/WEEKLY_FETCHED":
      return { ...state, weekly: { collection: action.payload } }
    default:
      return state
  }
}
