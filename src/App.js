import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux"
import accountsReducer from "./reducers/accounts"
import budgetReducer from "./reducers/budget"
import iconsReducer from "./reducers/icons"
import transactionsReducer from "./reducers/transactions"
import AccountWrapper from "./components/Accounts/Wrapper"
import AccountIndex from "./components/Accounts/Index"
import BudgetIndex from "./components/Budget/Index"
import BudgetCategories from "./components/Budget/Categories/Categories"
import Header from "./components/Header"
import Icons from "./components/Icons/Index"
import "./App.css"

const store = createStore(
                  combineReducers({
                    accounts: accountsReducer,
                    budget: budgetReducer,
                    icons: iconsReducer,
                    transactions: transactionsReducer,
                  })
)

const App = () => (
  <div className="App">
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/accounts" component={AccountWrapper} />
            <Route exact path="/accounts/index" component={AccountIndex} />
            <Route path="/accounts/:id/:month?/:year?" component={AccountWrapper} />
            <Route path="/accounts/:id/" component={AccountWrapper} />
            <Route exact path="/budget/categories" component={BudgetCategories} />
            <Route exact path="/budget/icons" component={Icons} />
            <Route path="/budget/:month?/:year?" component={BudgetIndex} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </div>
)

export default App
