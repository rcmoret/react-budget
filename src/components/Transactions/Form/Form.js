import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder'
import Icon from '../../Icons/Icon'
import BudgetItemSelect from './BudgetItemSelect'
import SubtransactionsButton from './SubtransactionsButton'
import SubtransactionsForm from './SubtransactionsForm'

class BudgetExclusion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
  }

  render() {
    if (this.state.selectedAccount.cash_flow === true) {
      return null
    } else {
      return (
        <div className="budget-exclusion">
          <div className="label">
            Budget Exclusion
          </div>
          <div className="input">
            <input
             type="checkbox"
             value={this.state.budget_exclusion}
             onChange={this.state.onChange}
             checked={this.state.budget_exclusion ? 'checked' : ''}
            />
         </div>
       </div>
      )
    }
  }
};

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clearance_date: '',
      description: '',
      amount: '',
      notes: '',
      check_number: '',
      subtransactions: [],
      ...props
    }
    this.updateTransaction = this.updateTransaction.bind(this)
    this.updateSelect = this.updateSelect.bind(this)
    this.addSubtransactions = this.addSubtransactions.bind(this)
    this.addSubtransaction = this.addSubtransaction.bind(this)
    this.hasSubtransactions = this.hasSubtransactions.bind(this)
    this.submitTransaction = this.submitTransaction.bind(this)
    this.removeSubtransaction = this.removeSubtransaction.bind(this)
    this.updateParent = this.updateParent.bind(this)
    this.subtransactionsAttributes = this.subtransactionsAttributes.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  updateTransaction(ev) {
    this.setState({ [ev.target.name]:  ev.target.value })
  }

  updateSelect(ev) {
    this.setState({ budget_item_id: ev.value })
  }

  addSubtransactions() {
    this.setState({ subtransactions: [{}, {}] })
  }

  addSubtransaction() {
    const { subtransactions } = this.state
    subtransactions.push({})
    this.setState({ subtransactions: subtransactions })
  }

  removeSubtransaction(id) {
    const { subtransactions } = this.state
    const newSubtransactions = subtransactions.filter((sub, i) => i !== id)
    this.setState({ subtransactions: newSubtransactions })
  }

  updateParent(newState) {
    const { subtransactions } = this.state
    subtransactions[newState._id] = newState
    const newAmount = subtransactions
                        .filter((sub) => parseFloat(sub.amount))
                        .map((sub) => parseFloat(sub.amount))
                        .reduce((acc, num) => acc + num, 0)
    this.setState({ amount: newAmount.toFixed(2), subtransactions: subtransactions })
  }

  hasSubtransactions() {
    return this.state.subtransactions.length > 0
  }

  subtransactionsAttributes() {
    return this.state.subtransactions.map((sub) => {
      return {
        ...sub,
        amount: Math.floor(parseFloat(sub.amount) * 100),
      }
    })
  }

  submitTransaction(ev) {
    const { clearance_date, amount, description, notes, budget_item_id } = this.state
    const accountId = this.state.selectedAccount.id
    const transactionBody = {
      clearance_date: clearance_date,
      amount: Math.floor(parseFloat(amount) * 100),
      description: description,
      notes: notes,
      budget_item_id: budget_item_id,
      subtransactions_attributes: this.subtransactionsAttributes(),
    }
    fetch(ApiUrlBuilder(['accounts', accountId, 'transactions']),
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionBody)
          })
          .then(response => response.json())
          .then(data => this.state.createTransaction(data))
  }

  render() {
    return (
      <div className="transaction-wrapper">
        <div className="transaction">
          <div className="transaction-form-row">
            <Link to="#" onClick={this.state.closeForm} className="fas fa-times" />
            <div className="clearance-date">
              <input
               type="text"
               name="clearance_date"
               placeholder="clearance date"
               onChange={this.updateTransaction}
               value={this.state.clearance_date}
              />
            </div>
            <div className="description">
              <input
               type="text"
               name="description"
               placeholder="description"
               onChange={this.updateTransaction}
               value={this.state.description}
              />
            </div>
            <div className="amount">
              <input
               type="text"
               name="amount"
               placeholder="amount"
               value={this.state.amount}
               onChange={this.updateTransaction}
               disabled={this.hasSubtransactions()}
              />
            </div>
            <div className='budget-item-select'>
              <BudgetItemSelect
               updateSelect={this.updateSelect}
               hasSubtransactions={this.hasSubtransactions()}
              />
            </div>
            <div className="transaction-submit">
              <button type="submit" onClick={this.submitTransaction}>
              Create Transaction
              </button>
            </div>
          </div>
          <SubtransactionsForm
           {...this.state}
           removeSubtransaction={this.removeSubtransaction}
           updateParent={this.updateParent}
          />
          <div className="transaction-form-row options">
            <SubtransactionsButton
             {...this.state}
             addSubtransactions={this.addSubtransactions}
             addSubtransaction={this.addSubtransaction}
            />
            <div className="check-number">
              <Icon className="fas fa-money-check" />&nbsp;
              <input
               type="text"
               name="check_number"
               value={this.state.check_number}
               onChange={this.updateTransaction}
               placeholder="check #"
              />
            </div>
            <div className="input-notes">
              <textarea
                placeholder="notes"
                name="notes"
                value={this.state.notes}
                onChange={this.updateTransaction}
              />
            </div>
            <BudgetExclusion onChange={this.updateTransaction} {...this.state} />
          </div>
        </div>
      </div>
    )
  }
}

export default Form;
