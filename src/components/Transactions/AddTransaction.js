import React, { Component } from "react"
import AddTransactionContainer from "./AddTransactionContainer"
import Form from "./Form/Form"

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

  showForm(e) {
    e.preventDefault()
    this.setState({ showForm: true })
  }

  closeForm(e) {
    e.preventDefault()
    this.setState({ showForm: false })
  }

  render() {
    if (this.state.showForm) {
      return (
        <Form
          selectedAccount={this.state.selectedAccount}
          closeForm={this.closeForm}
          createTransaction={this.state.createTransaction}
        />
      )
    } else {
      return (
        <AddTransactionContainer showForm={this.showForm} />
      )
    }
  }
}

AddTransaction.defaultProps = {
}

export default AddTransaction;
