import { update, updated, updateProps } from "./helpers/shared"

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
  case "icons/CREATED":
    return {
      ...state,
      collection: [
        ...state.collection,
        action.payload,
      ],
      newIcon: initialState.newIcon
    }
  case "icons/DELETED":
    return {
      ...state,
      collection: state.collection.filter(icon => icon.id !== action.payload)
    }
  case "icons/UPDATE_NEW":
    return {
      ...state,
      newIcon: {
        ...state.newIcon,
        ...action.payload
      }
    }
  case "icons/UPDATE_PROPS":
    return {
      ...state,
      collection: updateProps(action.payload, state.collection)
    }
  case "icons/FETCHED":
    return {
      ...state,
      collection: action.payload,
      fetched: true,
    }
  case "icons/RESET":
    return {
      ...state,
      collection: updated(action.payload, state.collection)
    }
  case "icons/RESET_NEW":
    return {
      ...state,
      newIcon: initialState.newIcon
    }
  case "icons/UPDATE":
    return {
      ...state,
      collection: update(action.payload, state.collection)
    }
  case "icons/UPDATED":
    return {
      ...state,
      collection: updated(action.payload, state.collection)
    }
  default:
    return state
  }
}
