import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icons/Icon'

class AddTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.showForm = this.showForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.updateTransaction = this.updateTransaction.bind(this)
  }

  showForm() {
    this.setState({ showForm: true })
  }

  closeForm() {
    this.setState({ showForm: false })
  }

  updateTransaction(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }

  render() {
    if (this.state.showForm) {
      return (
        <div className="transaction-wrapper">
          <div className="transaction">
            <Link to="#" onClick={this.closeForm} className="fas fa-times" />
            <div className="clearance-date">
              <input
               type="text"
               name="clearance_date"
               placeholder="clearance date"
               onChange={this.updateTransaction}
              />
            </div>
            <div className="description">
              <input
               type="text"
               name="description"
               placeholder="description"
               onChange={this.updateTransaction}
              />
            </div>
            <div className="amount">
              <input
               type="text"
               name="amount"
               placeholder="amount"
               onChange={this.updateTransaction}
              />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="transaction-wrapper">
          <div className="transaction">
            <div className="left-icon">
            </div>
            <Link to="#" onClick={this.showForm}>
              <Icon className="fas fa-plus" />&nbsp;
              <strong>Add New Transaction</strong>
            </Link>
          </div>
        </div>
      )
    }
  }
}

export default AddTransaction;
