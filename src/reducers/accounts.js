import { update, updated, updateProps } from "./helpers/shared"
import objectifyTransaction from "../shared/models/transaction"

const initialState = {
  collection: [],
  accountsFetched: false,
  showNewForm: false,
  newAccount: {
    cashFlow: true,
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
    return { ...state, collection: action.payload, accountsFetched: true }
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
      collection: updated(action.payload, state.collection),
      accountsFetched: false,
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
      collection: updateBalance(objectifyTransaction(action.payload), state.collection),
    }
  case "transactions/DELETED":
    return {
      ...state,
      collection: updateBalance(action.payload, state.collection),
    }
  case "transactions/UPDATED":
    return {
      ...state,
      collection: state.collection.map(acct => {
        if (acct.id !== action.payload.account_id) {
          return acct
        } else {
          return {
            ...acct,
            balance: (acct.balance + objectifyTransaction(action.payload).amount - action.payload.originalAmount),
          }
        }
      })
    }
  case "transfers/CREATED":
    return {
      ...state,
      collection: updateAfterTransferCreate(action.payload, state.collection),
    }
  case "transfers/DELETED":
    return {
      ...state,
      collection: updateAfterTransferDelete(action.payload, state.collection),
    }
  default:
    return state
  }
}

const updateBalance = (payload, collection) => {
  const { accountId, amount } = payload
  return collection.map(acct => {
    if (acct.id !== accountId) {
      return acct
    } else {
      return { ...acct, balance: (acct.balance + amount) }
    }
  })
}

const updateAfterTransferCreate = (payload, collection) => {
  const { fromTransaction, toTransaction } = payload
  const { amount } = toTransaction
  return collection.map(acct => {
    if (fromTransaction.accountId === acct.id) {
      return { ...acct, balance: (acct.balance - amount) }
    } else if (toTransaction.accountId === acct.id) {
      return { ...acct, balance: (acct.balance + amount) }
    } else {
      return acct
    }
  })
}

const updateAfterTransferDelete = (payload, collection) => {
  const { amount, fromAccountId, toAccountId } = payload
  return collection.map(acct => {
    if (fromAccountId === acct.id) {
      return { ...acct, balance: (acct.balance + amount) }
    } else if (toAccountId === acct.id) {
      return { ...acct, balance: (acct.balance - amount) }
    } else {
      return acct
    }
  })
}
