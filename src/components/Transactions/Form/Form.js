import React, { Component } from "react"
import * as actions from "../../../actions/transactions"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { fetchedBudgetItems } from "../../../actions/transactions"
import { fromDateString } from "../../../shared/Functions/DateFormatter"
import { Link } from "react-router-dom"
import Amount from "./Amount"
import CheckNumber from "./CheckNumber"
import BudgetExclusion from "./BudgetExclusion"
import BudgetItemSelect from "./BudgetItemSelect"
import ClearanceDate from "./ClearanceDate"
import Description from "./Description"
import Notes from "./Notes"
import Submit from "./Submit"
import SubtransactionsButton from "./SubtransactionsButton"
import SubtransactionsForm from "./SubtransactionsForm"

class Form extends Component {
  constructor(props) {
    super(props)
    this.addSubtransaction = this.addSubtransaction.bind(this)
    this.addSubtransactions = this.addSubtransactions.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.updateTransaction = this.updateTransaction.bind(this)
    this.updateSelect = this.updateSelect.bind(this)
    this.submitTransaction = this.submitTransaction.bind(this)
  }

  componentWillMount() {
    const { dateObject } = this.props
    const { fetched, month, year } = this.props.budgetItems
    if (!(fetched && month === dateObject.month && year === dateObject.year)) {
      const url = ApiUrlBuilder(["budget", "items"], { ...dateObject })
      fetch(url)
        .then(response => response.json())
        .then(data => this.props.dispatch(fetchedBudgetItems(data)))
    }
  }

  closeForm(e) {
    e.preventDefault()
    this.props.dispatch(actions.toggleForm({ showForm: false }))
  }

  updateTransaction(e) {
    this.props.dispatch(actions.editNew({ [e.target.name]:  e.target.value }))
  }

  updateSelect(e) {
    this.props.dispatch(actions.editNew({ budget_item_id:  e.value }))
  }

  addSubtransaction(e) {
    e.preventDefault()
    this.props.dispatch(actions.addSubtransaction({ id: null }))
  }

  addSubtransactions(e) {
    e.preventDefault()
    this.props.dispatch(actions.addSubtransactions({ id: null }))
  }

  submitTransaction(_e) {
    const accountId = this.props.selectedAccount.id
    const adjustedAmount = (parseFloat(this.props.amount)) * 100 || null
    const subtransactions = this.props.subtransactions.map(sub => {
      let adjusted = (parseFloat(sub.amount)) * 100 || null
      return { ...sub, amount: adjusted }
    })
    const body = {
      account_id: accountId,
      amount: adjustedAmount,
      check_number: this.props.check_number,
      clearance_date: this.props.clearance_date,
      description: this.props.description,
      notes: this.props.notes,
      subtransactions_attributes: subtransactions,
    }

    const url = ApiUrlBuilder(["accounts", accountId, "transactions"])
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      this.props.dispatch(actions.createTransaction(data))
      this.props.dispatch(actions.resetForm())
    })
  }

  render() {
    const { amount, check_number, clearance_date, description,
      notes, subtransactions, selectedAccount } = this.props
    const disabled = subtransactions.length > 0
    return (
      <div className="transaction-wrapper">
        <div className="transaction">
          <div className="transaction-form-row">
            <Link to="#" onClick={this.closeForm} className="fas fa-times" />
            <ClearanceDate
              clearanceDate={clearance_date}
              updateTransaction={this.updateTransaction}
            />
            <Description
              description={description}
              updateTransaction={this.updateTransaction}
            />
            <Amount
              amount={amount}
              disabled={disabled}
              updateTransaction={this.updateTransaction}
            />
            <BudgetItemSelect
             updateSelect={this.updateSelect}
             disabled={disabled}
             budgetItemId={this.props.budget_item_id}
            />
            <Submit
              submitTransaction={this.submitTransaction}
            />
          </div>
          <SubtransactionsForm
            subtransactions={subtransactions}
          />
          <div className="transaction-form-row options">
            <SubtransactionsButton
              subtransactions={subtransactions}
              addSubtransaction={this.addSubtransaction}
              addSubtransactions={this.addSubtransactions}
            />
            <CheckNumber
              checkNumber={check_number}
              updateTransaction={this.updateTransaction}
            />
            <Notes
              notes={notes}
              updateTransaction={this.updateTransaction}
            />
            <BudgetExclusion
              onChange={this.updateTransaction}
              selectedAccount={selectedAccount}
            />
          </div>
        </div>
      </div>
    )
  }
}

  // subtransactionsAttributes() {
  //   return this.state.subtransactions.map((sub) => {
  //     return {
  //       ...sub,
  //       amount: Math.floor(parseFloat(sub.amount) * 100),
  //     }
  //   })
  // }

  // submitTransaction(ev) {
  //   const { clearance_date, amount, description, notes, budget_item_id } = this.state
  //   const accountId = this.state.selectedAccount.id
  //   const transactionBody = {
  //     clearance_date: clearance_date,
  //     amount: Math.floor(parseFloat(amount) * 100),
  //     description: description,
  //     notes: notes,
  //     budget_item_id: budget_item_id,
  //     subtransactions_attributes: this.subtransactionsAttributes(),
  //   }
  //   fetch(ApiUrlBuilder(['accounts', accountId, 'transactions']),
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(transactionBody)
  //         })
  //         .then(response => response.json())
  //         .then(data => this.state.createTransaction(data))
  // }

const mapStateToProps = (state) => {
  const selectedAccountId = parseInt(state.transactions.metadata.query_options.account_id)
  const selectedAccount = state.accounts.collection.find(account => account.id === selectedAccountId)
  const dateObject = fromDateString(state.transactions.metadata.date_range[0], { format: "object" })
  const { subtransactions } = state.transactions.new

  return {
    ...state.transactions.new,
    selectedAccount: selectedAccount,
    budgetItems: state.transactions.budgetItems,
    dateObject: dateObject,
    subtransactions: subtransactions,
  }
}

export default connect(mapStateToProps)(Form)
