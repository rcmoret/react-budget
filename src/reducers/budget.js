import { update, updated, updateProps, updateItemInCollection } from "./helpers/shared"
import * as Helpers from "./helpers/budgetHelpers"
import * as setupHelpers from "./helpers/setupHelpers"

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
  newCategory: {
    name: "",
    default_amount: "",
    showForm: false,
    icon_id: null,
  },
  itemsFetched: false,
  metadata: {
    month: 12,
    year: 2099,
    is_closed_out: true,
    is_set_up: true,
  },
  showMenu: false,
  setup: {
    baseMonth: {
      month: 12,
      year: 2099,
      isFetched: false,
      collection: [],
    },
    newMonth: {
      month: 12,
      year: 2099,
      isFetched: false,
      reviewed: true,
      collection: [],
      newItem: {
        amount: "",
        budget_category_id: null,
      },
    },
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
  case "budget/categories/CREATED":
    return {
      ...state,
      categories: {
        collection: [
          ...state.categories.collection,
          action.payload
        ]
      }
    }
  case "budget/categories/DELETED":
    return {
      ...state,
      categories: {
        ...state.categories,
        collection: state.categories.collection.filter(category => category.id !== action.payload)
      }
    }
  case "budget/BASE_MONTH_FETCHED":
    return {
      ...state,
      setup: {
        ...state.setup,
        baseMonth: {
          ...state.setup.baseMonth,
          ...action.payload.metadata,
          isFetched: true,
          collection: action.payload.collection,
        },
      }
    }
  case "budget/NEW_MONTH_FETCHED":
    return {
      ...state,
      setup: {
        ...state.setup,
        newMonth: {
          ...state.setup.newMonth,
          ...action.payload.metadata,
          isFetched: true,
          collection: action.payload.collection,
        },
      }
    }
  case "budget/categories/RESET":
    return {
      ...state,
      categories: {
        collection: updated(action.payload, state.categories.collection)
      }
    }
  case "budget/categories/RESET_NEW_FORM":
    return {
      ...state,
      newCategory: initialState.newCategory
    }
  case "budget/categories/UPDATE_NEW":
    return {
      ...state,
      newCategory: {
        ...state.newCategory,
        ...action.payload,
      }
    }
  case "budget/categories/UPDATE_PROPS":
    return {
      ...state,
      categories: {
        ...state.categories,
        collection: updateProps(action.payload, state.categories.collection),
      }
    }
  case "budget/categories/UPDATE":
    return {
      ...state,
      categories: {
        ...state.categories,
        collection: update(action.payload, state.categories.collection),
      }
    }
  case "budget/categories/UPDATED":
    return {
      ...state,
      categories: {
        ...state.categories,
        collection: updated(action.payload, state.categories.collection),
      }
    }
  case "budget/ADD_CATEGORY":
    return {
      ...state,
      categories: {
        collection:
          [
            ...state.categories.collection,
            action.payload
          ]
      }
    }
  case "budget/ADD_MONTHLY_ITEM":
    return Helpers.addMonthlyItem(action.payload, state)
  case "budget/ADD_WEEKLY_ITEM":
    return Helpers.addWeeklyItem(action.payload, state)
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
    return Helpers.createMonthly(action.payload, state)
  case "budget/REMOVE_WEEKLY_ITEM":
    return Helpers.removeWeekly(action.payload, state)
  case "budget/REMOVE_MONTHLY_ITEM":
    return Helpers.removeMonthly(action.payload, state)
  case "budget/TOGGLE_DISCRETIONARY_DETAIL":
    return { ...state, discretionary: { ...state.discretionary, ...action.payload } }
  case "budget/TOGGLE_MENU":
    return {
      ...state,
      ...action.payload
    }
  case "budget/TOGGLE_MONTHLY_ITEM_FORM":
    return { ...state, monthly: { ...state.monthly, ...action.payload } }
  case "budget/TOGGLE_WEEKLY_ITEM_FORM":
    return { ...state, weekly: { ...state.weekly, ...action.payload } }
  case "budget/UPDATE_NEW_CATEGORY":
    return { ...state, newCategory: { ...state.newCategory, ...action.payload } }
  case "budget/UPDATE_MONTHLY_ITEM":
    return Helpers.updateMonthlyItem(action.payload, state)
  case "budget/UPDATE_WEEKLY_ITEM":
    return Helpers.updateWeeklyItem(action.payload, state)
  case "budget/setup/ADD_ITEM":
    return {
      ...state,
      setup: {
        ...state.setup,
        newMonth: {
          ...state.setup.newMonth,
          newItem: {
            amount: 0,
            budget_category_id: null,
          },
          collection: [
            ...state.setup.newMonth.collection,
            action.payload
          ],
        },
      },
    }
  case "budget/setup/EDIT_ADD_NEW":
    return {
      ...state,
      setup: {
        ...state.setup,
        newMonth: {
          ...state.setup.newMonth,
          reviewed: false,
          newItem: {
            ...state.setup.newMonth.newItem,
            ...action.payload,
          }
        }
      }
    }
  case "budget/setup/EDIT_REVIEW_ITEM":
    return {
      ...state,
      setup: {
        ...state.setup,
        newMonth: {
          ...state.setup.newMonth,
          reviewed: false,
          collection: setupHelpers.editReviewItem(action.payload, state.setup.newMonth.collection)
        }
      }
    }
  case "budget/setup/FINISH_REVIEW":
    return {
      ...state,
      setup: {
        ...state.setup,
        newMonth: {
          ...state.setup.newMonth,
          reviewed: true,
        }
      }
    }
  case "budget/setup/NEXT_STEP":
    return {
      ...state,
      setup: {
        ...state.setup,
        newMonth: {
          ...state.setup.newMonth,
          isReady: true
        }
      }
    }
  case "budget/setup/MARK_REVIEWED":
    return {
      ...state,
      setup: {
        ...state.setup,
        baseMonth: {
          ...state.setup.baseMonth,
          collection: state.setup.baseMonth.collection.map(item =>
            item.id === action.payload.id ? { ...item, reviewed: true } : item
          )
        }
      }
    }
  case "transactions/CREATED":
    return {
      ...state,
      itemsFetched: false,
    }
  case "transactions/DELETED":
    return {
      ...state,
      itemsFetched: false,
    }
  default:
    return state
  }
}
