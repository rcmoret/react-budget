import React, { Component } from "react"
import AccountEditForm from "./AccountEditForm"
import AccountContainer from "./AccountContainer"

class AccountShow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.showForm = this.showForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  showForm(ev) {
    this.setState({ showForm: true })
  }

  closeForm(ev) {
    this.setState({ showForm: false })
  }

  onSave(data) {
    this.setState({...data})
    this.state.onUpdate(data)
  }

  render() {
    if (this.state.showForm) {
      return (
        <AccountEditForm
          {...this.state}
          closeForm={this.closeForm}
          onSave={this.onSave}
        />
      )
    } else {
      return (
        <AccountContainer
          {...this.state}
          showForm={this.showForm}
        />
      )
    }
  }
}

export default AccountShow
