import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux"
import accountsReducer from "./reducers/accounts"
import budgetReducer from "./reducers/budget"
import iconsReducer from "./reducers/icons"
import transactionsReducer from "./reducers/transactions"
import transfersReducer from "./reducers/transfers"
import AccountWrapper from "./components/Accounts/Wrapper"
import AccountIndex from "./components/Accounts/Index"
import BudgetHome from "./components/Budget/Home"
import BudgetIndex from "./components/Budget/Index"
import BudgetSetUp from "./components/Budget/SetUp/Index"
import BudgetSetUpAddNew from "./components/Budget/SetUp/AddNew"
import BudgetSetUpIntro from "./components/Budget/SetUp/Introduction"
import BudgetCategories from "./components/Budget/Categories/Index"
import Header from "./components/Header"
import Icons from "./components/Icons/Index"
import Transfers from "./components/Transfers/Index"
import "./App.css"

const store = createStore(
  combineReducers({
    accounts: accountsReducer,
    budget: budgetReducer,
    icons: iconsReducer,
    transactions: transactionsReducer,
    transfers: transfersReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
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
            <Route exact path="/accounts/transfers" component={Transfers} />
            <Route path="/accounts/:id/:month?/:year?" component={AccountWrapper} />
            <Route path="/accounts/:id/" component={AccountWrapper} />
            <Route exact path="/budget/categories" component={BudgetCategories} />
            <Route exact path="/budget/icons" component={Icons} />
            <Route path="/budget/:month/:year" component={BudgetIndex} />
            <Route path="/budget/set-up/:month/:year/add-new" component={BudgetSetUpAddNew} />
            <Route path="/budget/set-up/:month/:year/intro" component={BudgetSetUpIntro} />
            <Route path="/budget/set-up/:month/:year" component={BudgetSetUp} />
            <Route exact path="/budget/:month?/:year?" component={BudgetHome} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </div>
)

export default App
