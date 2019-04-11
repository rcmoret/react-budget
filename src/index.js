import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';
import './components/Accounts/_account.css';
import './components/Budget/_budget.css';
import "./components/Icons/_icons.css"
import './components/Transactions/_transaction.css';
import './components/Transactions/_transaction_form.css';
import './components/Transfers/_transfers.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
