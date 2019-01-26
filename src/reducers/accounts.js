const updateItemInCollection = ({ updatedItem, collection, save }) => {
  return collection.map((item) => {
    if (item.id !== updatedItem.id) {
      return item
    } else if(save) {
      return { ...item, ...updatedItem, originalProps: null }
    } else {
      const originalProps = item.originalProps || item
      return { ...item, ...updatedItem, originalProps: originalProps }
    }
  })
}

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
      const collection = updateItemInCollection({
        updatedItem: action.payload,
        collection: state.collection,
        save: false
      })
      return { ...state, collection: collection }
    case "accounts/FETCHED":
      return { ...state, collection: action.payload }
    case "accounts/RESET_FORM":
      return { ...state, newAccount: {}, showNewForm: false }
    case "accounts/TOGGLE_SHOW_NEW_FORM":
      return { ...state, showNewForm: action.payload }
    case "accounts/UPDATE_ITEM":
      const newCollection = updateItemInCollection({
        updatedItem: action.payload,
        collection: state.collection,
        save: true
      })
      return { ...state, collection: newCollection }
    case "accounts/UPDATE_NEW":
      return { ...state, newAccount: {...state.newAccount, ...action.payload } }
    default:
      return state
  }
}
