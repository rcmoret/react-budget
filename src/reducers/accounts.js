import { update, updated, updateProps } from "./helpers/shared"

const initialState = {
  collection: [],
  showNewForm: false,
  newAccount: {
    cash_flow: true,
    name: "",
    priority: "",
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "accounts/CREATED":
      return { ...state, collection: [...state.collection, action.payload] }
    case "accounts/DELETED":
      return {
        ...state,
        collection: state.collection.filter(acct => acct.id !== action.payload.id)
      }
    case "accounts/FETCHED":
      return { ...state, collection: action.payload }
    case "accounts/RESET":
      return {
        ...state,
        collection: updated(action.payload, state.collection)
      }
    case "accounts/RESET_FORM":
      return {
        ...state,
        newAccount: initialState.newAccount,
        showNewForm: false
      }
    case "accounts/TOGGLE_SHOW_NEW_FORM":
      return { ...state, showNewForm: action.payload }
    case "accounts/UPDATE":
      return {
        ...state,
        collection: update(action.payload, state.collection)
      }
    case "accounts/UPDATED":
      return {
        ...state,
        collection: updated(action.payload, state.collection)
      }
    case "accounts/UPDATE_NEW":
      return {
        ...state,
        newAccount: { ...state.newAccount, ...action.payload }
      }
    case "accounts/UPDATE_PROPS":
      return {
        ...state,
        collection: updateProps(action.payload, state.collection)
      }
    case "transactions/CREATED":
      return {
        ...state,
        collection: updateBalance(action.payload, state.collection),
      }
    default:
      return state
  }
}

const updateBalance = (payload, collection) => {
  const { account_id, amount } = payload
  return collection.map(acct => {
    if (acct.id !== account_id) {
      return acct
    } else {
      return { ...acct, balance: (acct.balance + amount) }
    }
  })
}
