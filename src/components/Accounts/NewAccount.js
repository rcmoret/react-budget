import React, { Component } from "react"
import AccountForm from "./AccountForm"
import AddNewRow from "./AddNewRow"

class NewAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
    }
    this.showForm = this.showForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
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
        <AccountForm onSave={this.state.onSave} closeForm={this.closeForm} {...this.state} />
      )
    } else {
      return(
        <AddNewRow showForm={this.showForm} />
      )
    }
  }
}

NewAccount.defaultProps = {
  showForm: false,
}

export default NewAccount
