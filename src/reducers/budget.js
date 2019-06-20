import * as Helpers from "./helpers/budgetHelpers"
import * as setupHelpers from "./helpers/setupHelpers"
import objectifyCategory from "../shared/models/category"
import { update, updated, updateProps, updateItemInCollection } from "./helpers/shared"

const initialState = {
  discretionary: {
    balance: 0,
    spent: 0,
    total_remaining: 0,
    days_remaining: 1,
    total_days: 1,
    collection: [],
  },
  categories: {
    collection: [],
    fetched: false,
    filters: [
      { name: "adjective", value: "" },
      { name: "adverb", value: "" },
      { name: "search", value: "" },
    ],
    showFilters: false,
    showForm: false,
  },
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
    accrual: "false",
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
  menuOptions: {
    showAccruals: false,
    showCleared: false,
    showOptions: false,
  },
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
      reviewed: false,
      set_up_completed_at: null,
      collection: [],
      newItem: {
        amount: "",
        budget_category_id: null,
        selectedOption: "",
      },
    },
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
  case "budget/categories/APPLY_FILTER":
    return {
      ...state,
      categories: {
        ...state.categories,
        filters: state.categories.filters.map(filter => filter.name === action.payload.name ? action.payload : filter)
      }
    }
  case "budget/categories/CREATED":
    return {
      ...state,
      categories: {
        ...state.categories,
        collection: [
          ...state.categories.collection,
          objectifyCategory(action.payload)
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
  case "budget/categories/FETCHED":
    return {
      ...state,
      categories: {
        ...state.categories,
        collection: action.payload.map(category => objectifyCategory(category)),
        fetched: true
      }
    }
  case "budget/category/REMOVE_MATURITY_INTERVAL":
    return Helpers.removeMaturityInterval(action.payload, state)
  case "budget/categories/RESET":
    return {
      ...state,
      categories: {
        ...state.categories,
        collection: updated(action.payload, state.categories.collection)
      }
    }
  case "budget/categories/RESET_NEW_FORM":
    return {
      ...state,
      newCategory: initialState.newCategory
    }
  case "budget/categories/TOGGLE_CATEGORY_FILTERS":
    return {
      ...state,
      categories: {
        ...state.categories,
        showFilters: action.payload.showFilters,
      }
    }
  case "budget/categories/TOGGLE_NEW_FORM":
    return {
      ...state,
      categories: {
        ...state.categories,
        showForm: action.payload.showForm,
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
  case "budget/categories/UPDATED":
    if (action.payload.monthly) {
      return {
        ...state,
        categories: {
          ...state.categories,
          collection: updated(objectifyCategory(action.payload), state.categories.collection),
        },
        monthly: {
          ...state.monthly,
          collection: state.monthly.collection.map(item => {
            return item.budget_category_id === action.payload.id ? { ...item, name: action.payload.name, accrual: action.payload.accrual } : item
          })
        }
      }
    } else {
      return {
        ...state,
        categories: {
          ...state.categories,
          collection: updated(action.payload, state.categories.collection),
        },
        weekly: {
          ...state.weekly,
          collection: state.weekly.collection.map(item => {
            return item.budget_category_id === action.payload.id ? { ...item, name: action.payload.name, accrual: action.payload.accrual } : item
          })
        }
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
  case "budget/ADD_CATEGORY":
    return {
      ...state,
      categories: {
        ...state.categories,
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
  case "budget/TOGGLE_ACCRUAL_ITEMS":
    return {
      ...state,
      menuOptions: {
        ...state.menuOptions,
        ...action.payload,
      },
    }
  case "budget/TOGGLE_CLEARED_ITEMS":
    return {
      ...state,
      menuOptions: {
        ...state.menuOptions,
        ...action.payload,
      },
    }
  case "budget/TOGGLE_DISCRETIONARY_DETAIL":
    return { ...state, discretionary: { ...state.discretionary, ...action.payload } }
  case "budget/TOGGLE_MENU":
    return {
      ...state,
      menuOptions: {
        ...state.menuOptions,
        ...action.payload,
      },
    }
  case "budget/TOGGLE_MONTHLY_ITEM_FORM":
    return { ...state, monthly: { ...state.monthly, ...action.payload } }
  case "budget/TOGGLE_WEEKLY_ITEM_FORM":
    return { ...state, weekly: { ...state.weekly, ...action.payload } }
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
            amount: "",
            budget_category_id: null,
            selectedOption: "",
          },
          collection: [
            ...state.setup.newMonth.collection,
            action.payload
          ],
        },
      },
    }
  case "budget/setup/EDIT_NEW":
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
        },
        newMonth: {
          ...state.setup.newMonth,
          newItem: {
            amount: "",
            budget_category_id: null,
            selectedOption: "",
          }
        }
      }
    }
  case "budget/setup/REQUEUE":
    return {
      ...state,
      setup: {
        ...state.setup,
        baseMonth: {
          ...state.setup.baseMonth,
          collection: state.setup.baseMonth.collection.map(item =>
            item.id === action.payload.id ? { ...item, ...action.payload } : item
          )
        },
        newMonth: {
          ...state.setup.newMonth,
          newItem: {
            amount: "",
            budget_category_id: null,
            selectedOption: "",
          }
        }
      }
    }
  case "budget/setup/UPDATE_EXISTING":
    return {
      ...state,
      setup: {
        ...state.setup,
        newMonth: {
          ...state.setup.newMonth,
          newItem: {
            amount: "",
            budget_category_id: null,
            selectedOption: "",
          },
          collection: state.setup.newMonth.collection.map(item => {
            return item.id === action.payload.id ? action.payload : item
          }),
        },
      },
    }
  case "budget/setup/UPDATE_METADATA":
    return {
      ...state,
      itemsFetched: false,
      metadata: {
        ...state.metadata,
        ...action.payload,
      },
      setup: {
        ...state.setup,
        newMonth: {
          ...state.setup.newMonth,
          ...action.payload,
        },
      },
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
  case "transactions/UPDATED":
    return {
      ...state,
      itemsFetched: false,
    }
  default:
    return state
  }
}
