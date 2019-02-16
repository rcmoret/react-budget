import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import accountsReducer from "./reducers/accounts"
import budgetReducer from "./reducers/budget"
import transactionsReducer from "./reducers/transactions"
import Accounts from './components/Accounts/Accounts';
import AccountIndex from './components/Accounts/AccountIndex';
import BudgetIndex from './components/Budget/Index';
import BudgetCategories from './components/Budget/Categories/Categories';
import Header from './components/Header'
import './App.css';

const store = createStore(
                  combineReducers({
                    accounts: accountsReducer,
                    budget: budgetReducer,
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
            <Route exact path='/accounts' component={Accounts} />
            <Route exact path='/accounts/index' component={AccountIndex} />
            <Route path='/accounts/:id' component={Accounts} />
            <Route exact path='/budget/categories' component={BudgetCategories} />
            <Route path='/budget/:month?/:year?' component={BudgetIndex} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </div>
)

export default App;
