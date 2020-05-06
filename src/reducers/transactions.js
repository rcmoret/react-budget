import objectifyMonthly from "../models/monthlyBudgetItem"
import objectifyTransaction, { defaultFormOptions } from "../models/transaction"
import objectifyWeekly from "../models/weeklyBudgetItem"
import * as helpers from "./helpers/transactionHelpers"

const today = new Date()

const emptyDetail = {
  amount: "",
  budget_item_id: null,
  disabled: false,
}

const initialState = {
  metadata: {
    date_range: ["", ""],
    prior_balance: 0,
    query_options: {
      month: (today.getMonth() + 1),
      year: (today.getFullYear()),
    },
  },
  collection: [],
  budgetItems: {
    collection: [],
    fetched: false,
  },
  new: {
    id: null,
    check_number: "",
    clearance_date: "",
    description: "",
    notes: null,
    showForm: true,
    budget_exclusion: false,
    receipt: null,
    formOptions: defaultFormOptions,
    details: [emptyDetail],
  },
}

export default (state = initialState, action) => {
  switch(action.type) {
  case "budget/ADD_MONTHLY_ITEM":
    if (parseInt(state.metadata.query_options.month) === action.payload.month &&
        parseInt(state.metadata.query_options.year) === action.payload.year) {
      return {
        ...state,
        budgetItems: {
          ...state.budgetItems,
          collection: [
            ...state.budgetItems.collection,
            objectifyMonthly(action.payload)
          ]
        }
      }
    } else {
      return state
    }
  case "budget/ADD_WEEKLY_ITEM":
    if (parseInt(state.metadata.query_options.month) === action.payload.month &&
        parseInt(state.metadata.query_options.year) === action.payload.year) {
      return {
        ...state,
        budgetItems: {
          ...state.budgetItems,
          collection: [
            ...state.budgetItems.collection,
            objectifyWeekly(action.payload)
          ]
        }
      }
    } else {
      return state
    }
  case "budget/UPDATE_MONTHLY_ITEM":
    return {
      ...state,
      budgetItems: {
        ...state.budgetItems,
        fetched: false
      }
    }
  case "budget/UPDATE_WEEKLY_ITEM":
    return {
      ...state,
      budgetItems: {
        ...state.budgetItems,
        fetched: false
      }
    }
  case "transactions/ADD_DETAIL_TO_ENTRY":
    return {
      ...state,
      collection: state.collection.map(txn => {
        return txn.id !== action.payload.id ? txn : { ...txn, details: [...txn.details, { ...emptyDetail, _id: action.payload.detailId }] }
      })
    }
  case "transactions/ADD_DETAIL_TO_NEW":
    return {
      ...state,
      new: {
        ...state.new,
        details: [
          ...state.new.details,
          emptyDetail,
        ]
      }
    }
  case "budget/categories/MATURITY_INTERVAL_CREATED":
    return {
      ...state,
      budgetItems: {
        ...state.budgetItems,
        fetched: false
      }
    }
  case "transactions/CREATED":
    return helpers.createTransaction(action.payload, state)
  case "transactions/DELETED":
    return {
      ...state,
      collection: state.collection.filter(txn => txn.id !== action.payload.id)
    }
  case "transactions/EDIT":
    return {
      ...state,
      collection: state.collection.map(txn => (
        txn.id !== action.payload.id ? txn : { ...txn, ...action.payload }
      ))
    }
  case "transactions/EDIT_FORM_OPTIONS":
    return {
      ...state,
      collection: state.collection.map(txn => (
        txn.id !== action.payload.id ? txn : { ...txn, formOptions: {...txn.formOptions, ...action.payload } }
      ))
    }
  case "transactions/EDIT_NEW_FORM_OPTIONS":
    return {
      ...state,
      new: {
        ...state.new,
        formOptions: {
          ...state.new.formOptions,
          ...action.payload,
        },
      },
    }
  case "transactions/EDIT_PROPS":
    return {
      ...state,
      collection: state.collection.map(txn => (
        action.payload.id === txn.id ? helpers.editProps(txn, action.payload) : txn
      ))
    }
  case "transactions/EDIT_DETAIL_PROPS":
    return {
      ...state,
      collection: state.collection.map(txn => (
        txn.id === action.payload.txnId ? helpers.editDetailProps(txn, action.payload) : txn
      ))
    }
  case "transactions/FETCHED":
    return {
      ...state,
      new: {
        ...state.new,
        budget_exclusion: false,
      },
      metadata: action.payload.metadata,
      collection: action.payload.transactions.map(txn => objectifyTransaction(txn)),
    }
  case "transactions/FETCHED_BUDGET_ITEMS":
    return {
      ...state,
      budgetItems: {
        collection: action.payload.collection.map(item => {
          return item.monthly ? objectifyMonthly(item) : objectifyWeekly(item, { days_remaning: 1, total_days: 30 })
        }),
        fetched: true,
        month: action.payload.metadata.month,
        year: action.payload.metadata.year,
      },
    }
  case "transactions/REMOVE_DETAIL":
    return helpers.removeDetail({...action.payload, state: state })
  case "transactions/REMOVE_NEW_DETAIL":
    return {
      ...state,
      new: {
        ...state.new,
        details: state.new.details.filter((detail, index) => index !== action.payload.index)
      },
    }
  case "transactions/RESET_NEW":
    return {
      ...state,
      new: { ...initialState.new, ...action.payload },
    }
  case "transactions/TOGGLE_EDIT_FORM":
    return helpers.toggleEditForm(action.payload, state)
  case "transactions/TOGGLE_NEW_FORM":
    return {
      ...state,
      new: { ...state.new, showForm: !state.new.showForm },
      collection: state.collection.map(txn => (
        {...txn, showForm: (!state.new.showForm ? false : txn.showForm)}
      )),
    }
  case "transactions/UPDATE_NEW":
    return {
      ...state,
      new: helpers.editNew(state.new, action.payload)
    }
  case "transactions/UPDATE_NEW_DETAIL":
    return helpers.updateNewDetail(action.payload, state)
  case "transactions/UPDATED":
    return helpers.updatedTransaction(action.payload, state)
  case "transfers/CREATED":
    return helpers.transferCreated(action.payload, state)
  case "transfers/DELETED":
    return helpers.transferDeleted(action.payload, state)
  default:
    return state
  }
}
