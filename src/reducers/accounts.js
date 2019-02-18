import { updateItemInCollection } from "./helpers/shared"

const initialState = {
  collection: [],
  showNewForm: false,
  newAccount: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "accounts/ADD_NEW":
      return { ...state, collection: [...state.collection, action.payload] }
    case "accounts/EDIT_ITEM":
      return {
        ...state,
        collection: updateItemInCollection({
          updatedItem: action.payload,
          collection: state.collection,
          save: false
        })
      }
    case "accounts/DELETED_ACCOUNT":
      return {
        ...state,
        collection: state.collection.filter(acct => acct.id !== action.payload.id)
      }
    case "accounts/FETCHED":
      return { ...state, collection: action.payload }
    case "accounts/RESET_FORM":
      return { ...state, newAccount: {}, showNewForm: false }
    case "accounts/TOGGLE_SHOW_NEW_FORM":
      return { ...state, showNewForm: action.payload }
    case "accounts/UPDATE_ITEM":
      return {
        ...state,
        collection: updateItemInCollection({
          updatedItem: action.payload,
          collection: state.collection,
          save: true
        })
      }
    case "accounts/UPDATE_NEW":
      return { ...state, newAccount: {...state.newAccount, ...action.payload } }
    case "transactions/CREATE_TRANSACTION":
      console.log(updateBalance(action.payload, state.collection))
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
