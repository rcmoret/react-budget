import objectifyMonthly from "../shared/models/monthlyBudgetItem"
import objectifyWeekly from "../shared/models/weeklyBudgetItem"
import * as helpers from "./helpers/transactionHelpers"

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
    clearance_date: "",
    description: "",
    amount: "",
    check_number: "",
    showForm: false,
    subtransactions: [],
  },
}

const emptySubtransaction = {
  description: "",
  amount: "",
  budget_item_id: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case "transactions/ADD_SUBTRANSACTION_TO_NEW":
      if (state.new.subtransactions.length > 0) {
        return {
          ...state,
          new: {
            ...state.new,
            subtransactions: [
              ...state.new.subtransactions,
              emptySubtransaction
            ]
          }
        }
      } else {
        return {
          ...state,
          new: {
            ...state.new,
            subtransactions: [
              emptySubtransaction,
              emptySubtransaction
            ]
          }
        }
      }
    case "transactions/CREATED":
      return {
        ...state,
        collection: [
          ...state.collection,
          action.payload
        ]
      }
    case "transactions/FETCHED":
      return {
        ...state,
        metadata: action.payload.metadata,
        collection: action.payload.transactions,
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
    case "transactions/UPDATE_NEW_SUBTRANSACTION":
      return helpers.updateNewSubtransaction(state, action.payload)
    default:
      return state
  }
}
