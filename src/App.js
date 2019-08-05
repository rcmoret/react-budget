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
import BudgetFinalizeIndex from "./components/Budget/Finalize/Index"
import BudgetFinalizeAccruals from "./components/Budget/Finalize/Accruals"
import BudgetFinalizeFinish from "./components/Budget/Finalize/Finish"
import BudgetFinalizeItems from "./components/Budget/Finalize/Items"
import BudgetHome from "./components/Budget/Home"
import BudgetIndex from "./components/Budget/Index"
import BudgetSetUpAccruals from "./components/Budget/SetUp/Accruals"
import BudgetSetUpExpenses from "./components/Budget/SetUp/Expenses"
import BudgetSetUpFinalize from "./components/Budget/SetUp/Finalize"
import BudgetSetUpIntro from "./components/Budget/SetUp/Introduction"
import BudgetSetUpRevenues from "./components/Budget/SetUp/Revenues"
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

export default () => (
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
            <Route exact path="/budget/:month/:year" component={BudgetIndex} />
            <Route path="/budget/finalize/:month/:year/start" component={BudgetFinalizeIndex} />
            <Route path="/budget/finalize/:month/:year/accruals" component={BudgetFinalizeAccruals} />
            <Route path="/budget/finalize/:month/:year/finish" component={BudgetFinalizeFinish} />
            <Route path="/budget/finalize/:month/:year/items" component={BudgetFinalizeItems} />
            <Route path="/budget/set-up/:month/:year/accruals" component={BudgetSetUpAccruals} />
            <Route path="/budget/set-up/:month/:year/expenses" component={BudgetSetUpExpenses} />
            <Route path="/budget/set-up/:month/:year/finalize" component={BudgetSetUpFinalize} />
            <Route path="/budget/set-up/:month/:year/intro" component={BudgetSetUpIntro} />
            <Route path="/budget/set-up/:month/:year/revenues" component={BudgetSetUpRevenues} />
            <Route exact path="/budget/:month?/:year?" component={BudgetHome} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </div>
)
