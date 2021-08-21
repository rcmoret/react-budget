import * as Helpers from "./helpers/budgetHelpers"
import * as setupHelpers from "./helpers/setupHelpers"
import { update, updated, updateProps, updateItemInCollection } from "./helpers/shared"

const initialNewCategory = {
  name: "",
  default_amount: "",
  slug: "",
  accrual: "false",
  showForm: false,
  icon_id: null,
  errors: [],
}

const today = new Date()
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
    showForm: false,
    show: {
      id: null,
      name: "",
      slug: "",
      dataCachedAt: null,
      events: [],
      transactions: [],
      itemViews: [],
      dateRange: {
        beginning_month: null,
        begining_year: null,
        ending_month: null,
        ending_year: null,
      }
    },
  },
  monthly: {
    collection: [],
    showForm: false,
    newItem: {
      amount: "",
      budget_category_id: null,
      errors: [],
    },
  },
  weekly: {
    collection: [],
    showForm: false,
    newItem: {
      amount: "",
      budget_category_id: null,
      errors: [],
    },
  },
  newCategory: initialNewCategory,
  itemsFetched: false,
  metadata: {
    month: (today.getMonth() + 1),
    year: (today.getFullYear()),
    is_closed_out: true,
    is_set_up: true,
  },
  menuOptions: {
    showAccruals: false,
    showAdjustItemsForm: false,
    showCleared: false,
    sortOrder: "byName",
  },
  finalize: {
    baseMonth: {
      month: null,
      year: null,
      isFetched: false,
      collection: [],
      is_closed_out: false,
    },
    next: {
      month: null,
      year: null,
      isFetched: false,
      collection: [],
    },
    extra: [],
    selectedFromAccountId: null,
    selectedToAccountId: null,
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
  },
  maturityIntervals: [],
  adjustForm: {
    items: [],
    selectedValue: null,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
  case "budget/ADD_FIELD_TO_ITEMS_ADJUST":
    return {
      ...state,
      adjustForm: {
        ...state.adjustForm,
        selectedValue: null,
        items: [
          ...state.adjustForm.items,
          action.payload,
        ],
      },
    }
  case "budget/ADJUST_ITEM_FORM_SUBMIT":
    return {
      ...state,
      itemsFetched: false,
      adjustForm: {
        ...state.adjustForm,
        selectedValue: null,
        items: [],
      },
      menuOptions: {
        ...state.menuOptions,
        showAdjustItemsForm: false,
      },
    }
  case "budget/REMOVE_ADJUST_FORM_CATEGORY":
    return {
      ...state,
      adjustForm: {
        ...state.adjustForm,
        items: state.adjustForm.items.filter(item => (item.id !== action.payload.id))
      },
    }
  case "budget/REMOVE_ADJUST_FORM_ITEM":
    return {
      ...state,
      adjustForm: {
        ...state.adjustForm,
        items: state.adjustForm.items.filter(item => (item.id !== action.payload.id))
      },
    }
  case "budget/UPDATE_ADJUST_FORM_CATEGORY":
    return {
      ...state,
      adjustForm: {
        ...state.adjustForm,
        items: state.adjustForm.items.map(item => (
          item.id === action.payload.id ? Helpers.adjustmentFormHelper(item, action.payload) : item
        ))
      }
    }
  case "budget/UPDATE_ADJUST_FORM_ITEM":
    return {
      ...state,
      adjustForm: {
        ...state.adjustForm,
        items: state.adjustForm.items.map(item => (
          item.id === action.payload.id ? Helpers.adjustmentFormHelper(item, action.payload) : item
        ))
      }
    }
  case "budget/UPDATED_ITEM_ADJUST_SELECTED_VALUE":
    return {
      ...state,
      adjustForm: {
        ...state.adjustForm,
        selectedValue: action.payload.selectedValue
      }
    }
  case "budget/categories/APPLY_ERRORS_ON_EDIT":
    return {
      ...state,
      categories: {
        ...state.categories,
        collection: state.categories.collection.map(category => {
          if (category.id === action.payload.id) {
            return { ...category, errors: [...category.errors, ...action.payload.errors] }
          } else {
            return category
          }
        })
      },
    }
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
        showForm: false,
        collection: [
          ...state.categories.collection,
          { ...action.payload, isNew: true }
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
  case "budget/categories/EDIT_MATURITY_INTERVAL":
    return {
      ...state,
      maturityIntervals: updateProps(action.payload, state.maturityIntervals),
    }
  case "budget/categories/ERRORS_ON_NEW":
    return {
      ...state,
      newCategory: {
        ...state.newCategory,
        ...action.payload, // comes in as { errors: [{ name: ["invalid"] }] }
      },
    }
  case "budget/categories/FETCHED":
    return {
      ...state,
      categories: {
        ...state.categories,
        collection: action.payload,
        fetched: true
      }
    }
  case "budget/categories/MATURITY_INTERVAL_CREATED":
    return {
      ...state,
      itemsFetched: false,
      categories: {
        ...state.categories,
        collection: state.categories.collection.map(category => {
          if (category.id !== action.payload.id) {
            return category
          } else {
            return {
              ...category,
              showMaturityIntervalForm: false,
              newMaturityIntervalAttributes: {},
            }
          }
        }),
      },
      maturityIntervals: [
        ...state.maturityIntervals,
        action.payload.maturityInterval
      ]
    }
  case "budget/categories/MATURITY_INTERVALS_FETCHED":
    return {
      ...state,
      categories: {
        ...state.categories,
        collection: state.categories.collection.map(category =>
          category.id === action.payload.id ? { ...category, maturityIntervalsFetched: true } : category
        )
      },
      maturityIntervals: [
        ...state.maturityIntervals,
        ...action.payload.collection
      ],
    }
  case "budget/category/REMOVE_MATURITY_INTERVAL":
    return {
      ...state,
      itemsFetched: false,
      maturityIntervals: state.maturityIntervals.filter(interval => interval.id !== action.payload.id)
    }
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
      newCategory: initialNewCategory,
    }
  case "budget/categories/TOGGLE_MATURITY_INTERVAL_EDIT_FORM":
    return {
      ...state,
      maturityIntervals: state.maturityIntervals.map(mi =>
        mi.id === action.payload.id ? { ...mi, ...action.payload } : mi
      )
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
  case "budget/categories/UPDATE_MATURITY_INTERVAL":
    return {
      ...state,
      maturityIntervals: updated(action.payload, state.maturityIntervals)
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
          collection: updated(action.payload, state.categories.collection),
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
  case "budget/categories/show/DATA_FETCHED":
    return {
      ...state,
      categories: {
        ...state.categories,
        show: {
          ...state.categories.show,
          dataCachedAt: new Date(),
          slug: action.payload.category.slug,
          events: action.payload.events,
          itemViews: action.payload.item_views,
          transactions: action.payload.transactions,
          dateRange: action.payload.date_range,
        },
      },
    }
  case "budget/finalize/ADD_FINALIZE_ITEM":
    return {
      ...state,
      finalize: {
        ...state.finalize,
        next: {
          ...state.finalize.next,
          collection: [
            ...state.finalize.next.collection,
            {...action.payload[0].item, events: [] }
          ]
        },
      },
    }
  case "budget/finalize/BASE_MONTH_FETCH":
    return {
      ...state,
      finalize: {
        ...state.finalize,
        baseMonth: {
          ...state.finalize.baseMonth,
          ...action.payload.metadata,
          collection: Helpers.finalizeItemsCollection(action.payload),
          isFetched: true,
        },
        extra: [
          ...state.finalize.extra,
          {
            id: 0,
            name: "Discretionary",
            amount: (-1 * Helpers.calculateDiscretionary(action.payload)),
          }
        ]
      },
    }
  case "budget/finalize/EDIT_BASE_AMOUNT":
    return {
      ...state,
      finalize: {
        ...state.finalize,
        baseMonth: {
          ...state.finalize.baseMonth,
          collection: state.finalize.baseMonth.collection.map(item =>
            item.id === action.payload.id ? { ...item, ...action.payload } : item
          )
        },
      },
    }
  case "budget/finalize/MARK_INTERVAL_CLOSED":
    return {
      ...state,
      finalize: {
        ...state.finalize,
        baseMonth: {
          ...state.finalize.baseMonth,
          is_closed_out: true,
        },
      }
    }
  case "budget/finalize/MARK_SELECTED":
    return {
      ...state,
      finalize: {
        ...state.finalize,
        next: {
          ...state.finalize.next,
          collection: state.finalize.next.collection.map(item =>
            item.id === action.payload.id ? { ...item, selected: true } : { ...item, selected: false }
          )
        },
      }
    }
  case "budget/finalize/NEXT_MONTH_FETCH":
    return Helpers.nextMonthFetched(action.payload, state)
  case "budget/finalize/SET_STATUS":
    return {
      ...state,
      finalize: {
        ...state.finalize,
        baseMonth: {
          ...state.finalize.baseMonth,
          collection: state.finalize.baseMonth.collection.map(item =>
            item.id === action.payload.id ? { ...item, ...action.payload } : item
          ),
        },
      },
    }
  case "budget/finalize/UPDATE_EXTRA":
    return {
      ...state,
      finalize: {
        ...state.finalize,
        extra: Helpers.updateExtra(action.payload, state.finalize.extra)
      },
    }
  case "budget/finalize/UPDATE_FINALIZE_ITEM":
    return Helpers.updateFinalizeItem(action.payload, state)
  case "budget/finalize/UPDATE_SELECTED_FROM_ACCOUNT_ID":
    return {
      ...state,
      finalize: {
        ...state.finalize,
        selectedFromAccountId: action.payload.id
      },
    }
  case "budget/finalize/UPDATE_SELECTED_TO_ACCOUNT_ID":
    return {
      ...state,
      finalize: {
        ...state.finalize,
        selectedToAccountId: action.payload.id
      },
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
  case "budget/CHANGE_ITEM_SORT_ORDER":
    return {
      ...state,
      menuOptions: {
        ...state.menuOptions,
        ...action.payload,
      },
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
  case "budget/FETCHED_WEEKLY_BUDGET_ITEM_EVENTS":
    return {
      ...state,
      weekly: {
        ...state.weekly,
        collection: updateItemInCollection({
          updatedItem: { id: action.payload.id, events: action.payload.events },
          collection: state.weekly.collection,
          save: false
        })
      }
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
    return Helpers.setUpIndex(action.payload, state)
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
  case "budget/TOGGLE_ADJUST_ITEM_FORM":
    return {
      ...state,
      menuOptions: {
        ...state.menuOptions,
        showAdjustItemsForm: !state.menuOptions.showAdjustItemsForm,
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
    return Helpers.addNewSetupItem(action.payload, state)
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
  case "budget/setup/EDIT_ACCRUAL_AMOUNT":
    return {
      ...state,
      setup: {
        ...state.setup,
        baseMonth: {
          ...state.setup.baseMonth,
          collection: updateProps(action.payload, state.setup.baseMonth.collection)
        },
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
  case "budget/setup/MARK_FOR_INCLUSION":
    return {
      ...state,
      setup: {
        ...state.setup,
        baseMonth: {
          ...state.setup.baseMonth,
          collection: state.setup.baseMonth.collection.map(item =>
            item.id === action.payload.id ? { ...item, markedForExclusion: action.payload.exclude } : item
          )
        },
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
  case "budget/setup/MARK_SUBMITTED":
    return {
      ...state,
      setup: {
        ...state.setup,
        baseMonth: {
          ...state.setup.baseMonth,
          collection: state.setup.baseMonth.collection.map(item =>
            item.id === action.payload.id ? { ...item, submitted: true } : item
          )
        },
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
