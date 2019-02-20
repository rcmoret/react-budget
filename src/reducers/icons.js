const initialState = {
  collection: [],
  fetched: false,
  newIcon: {
    name: "",
    class_name: "",
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case "icons/CREATE":
      return {
        ...state,
        collection: [
          ...state.collection,
          action.payload,
        ],
        newIcon: initialState.newIcon
      }
    case "icons/EDIT_NEW":
      return {
        ...state,
        newIcon: {
          ...state.newIcon,
          ...action.payload
        }
      }
    case "icons/FETCHED":
      return {
        ...state,
        collection: action.payload,
        fetched: true,
      }
    default:
      return state
  }
}
