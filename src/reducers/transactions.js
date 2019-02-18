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
  showForm: false,
  new: {
    clearance_date: "",
    description: "",
    amount: "",
    check_number: "",
    subtransactions: [],
  },
}

export default (state = initialState, action) => {
  switch(action.type) {
    case "transactions/ADD_SUBTRANSACTION":
      if (action.payload.id) {
        return state
      } else {
        return helpers.addSubtransaction(state)
      }
    case "transactions/ADD_SUBTRANSACTIONS":
      if (action.payload.id) {
        return state
      } else {
        return helpers.addSubtransactions(state)
      }
    case "transactions/CREATE_TRANSACTION":
      return helpers.createTransaction(action.payload, state)
    case "transactions/EDIT_NEW":
      return { ...state, new: { ...state.new, ...action.payload } }
    case "transactions/EDIT_SUBTRANSACTION":
      return helpers.editSubtransaction(action.payload, state)
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
    case "transactions/REMOVE_SUBTRANSACTION":
      return helpers.removeSubtransaction(action.payload._id, state)
    case "transactions/RESET_FORM":
      return {
        ...state,
        new: initialState.new,
        showForm: false,
        budgetItems: {
          ...state.budgetItems,
          fetched: false
        }
      }
    case "transactions/TOGGLE_FORM":
      return { ...state, ...action.payload }
    default:
      return state
  }
}
