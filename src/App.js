import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Accounts from './components/Accounts';
import Budget from './components/Budget';
import Header from './components/Header'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path='/accounts' component={Accounts} />
            <Route path='/accounts/:id' component={Accounts} />
            <Route exact path='/budget' component={Budget} />
          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
