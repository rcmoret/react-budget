import React, { Component } from "react"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import FormContainer from "./FormContainer"

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
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

  updateTransaction(ev) {
    this.setState({ [ev.target.name]:  ev.target.value })
  }

  updateSelect(ev) {
    this.setState({ budget_item_id: ev.value })
  }

  addSubtransactions(ev) {
    ev.preventDefault()
    this.setState({ subtransactions: [{}, {}] })
  }

  addSubtransaction(ev) {
    ev.preventDefault()
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
      <FormContainer
        {...this.state}
        addSubtransactions={this.addSubtransactions}
        addSubtransaction={this.addSubtransaction}
        closeForm={this.state.closeForm}
        disabled={this.hasSubtransactions()}
        removeSubtransaction={this.removeSubtransaction}
        submitTransaction={this.submitTransaction}
        updateParent={this.updateParent}
        updateSelect={this.updateSelect}
        updateTransaction={this.updateTransaction}
      />
    )
  }
}

Form.defaultProps = {
  clearance_date: '',
  description: '',
  amount: '',
  notes: '',
  check_number: '',
  subtransactions: [],
}

export default Form;
