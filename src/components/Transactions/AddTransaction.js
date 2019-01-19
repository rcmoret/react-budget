import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Form from './Form/Form'
import Icon from '../Icons/Icon'

class AddTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.showForm = this.showForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
  }

  showForm() {
    this.setState({ showForm: true })
  }

  closeForm() {
    this.setState({ showForm: false })
  }

  render() {
    if (this.state.showForm) {
      return (
        <Form closeForm={this.closeForm} createTransaction={this.state.createTransaction} {...this.state} />
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

AddTransaction.defaultProps = {
  showForm: false,
}

export default AddTransaction;
