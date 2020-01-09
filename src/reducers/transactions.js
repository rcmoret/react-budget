import objectifyMonthly from "../shared/models/monthlyBudgetItem"
import objectifyTransaction from "../shared/models/transaction"
import objectifyWeekly from "../shared/models/weeklyBudgetItem"
import * as helpers from "./helpers/transactionHelpers"
import { updateProps } from "./helpers/shared"

const emptyDetail = {
  amount: "",
  budget_item_id: null,
}

const initialState = {
  metadata: {
    date_range: ["", ""],
    prior_balance: 0,
    query_options: {},
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
    showForm: false,
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
      collection: state.collection.map(txn => {
        return txn.id !== action.payload.id ? txn : { ...txn, ...action.payload }
      })
    }
  case "transactions/EDIT_PROPS":
    return {
      ...state,
      collection: updateProps(action.payload, state.collection)
    }
  case "transactions/EDIT_DETAIL_PROPS":
    return {
      ...state,
      collection: state.collection.map(txn => {
        return txn.id === action.payload.txnId ? helpers.editDetailProps(txn, action.payload) : txn
      })
    }
  case "transactions/FETCHED":
    return {
      ...state,
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
  case "transactions/RESET_NEW":
    return {
      ...state,
      new: initialState.new
    }
  case "transactions/UPDATE_NEW":
    return {
      ...state,
      new: {
        ...state.new,
        ...action.payload
      }
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
