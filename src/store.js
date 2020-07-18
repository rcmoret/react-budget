import { createStore, combineReducers } from "redux"

import accountsReducer from "./reducers/accounts"
import apiReducer from "./components/Api/reducer"
import budgetReducer from "./reducers/budget"
import iconsReducer from "./reducers/icons"
import messageReducer from "./components/Messages/reducer"
import transactionsReducer from "./reducers/transactions"
import transfersReducer from "./reducers/transfers"

const store = createStore(
  combineReducers({
    accounts: accountsReducer,
    api: apiReducer,
    budget: budgetReducer,
    icons: iconsReducer,
    messages: messageReducer,
    transactions: transactionsReducer,
    transfers: transfersReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export const { dispatch, getState } = store

export default store
