import { updateItemInCollection } from "./shared"

const initialState = {
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
    case "budget/MONTHLY_FETCHED":
      return { ...state, monthly: { collection: action.payload } }
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
