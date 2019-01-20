import React, { Component } from "react"
import AccountFormContainer from './AccountFormContainer'
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"

class AccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.updateName = this.updateName.bind(this)
    this.updatePriority = this.updatePriority.bind(this)
    this.updateCashFlow = this.updateCashFlow.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.accountBody = this.accountBody.bind(this)
  }

  updateName(ev) {
    this.setState({ name: ev.target.value })
  }

  updatePriority(ev) {
    this.setState({ priority: ev.target.value })
  }

  updateCashFlow(ev) {
    this.setState({ cash_flow: !this.state.cash_flow })
  }

  accountBody() {
    const body = {
      name: this.state.name,
      priority: this.state.priority,
      cash_flow: this.state.cash_flow,
    }
    return JSON.stringify(body)
  }

  submitForm(ev) {
    const url  = this.state.account_id ? ApiUrlBuilder(["accounts", this.state.account_id]) : ApiUrlBuilder(["accounts"])
    fetch(url,
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: this.accountBody(),
      }
    )
      .then(resp => resp.json())
      .then(data => this.state.onSave(data))
      .then(() => this.setState({ name: "", priority: "" }))
      .then(() => this.state.closeForm())
  }

  render() {
    return (
      <AccountFormContainer
        {...this.state}
        updateName={this.updateName}
        updatePriority={this.updatePriority}
        updateCashFlow={this.updateCashFlow}
        closeForm={this.state.closeForm}
        submitForm={this.submitForm}
      />
    )
  }
}

AccountForm.defaultProps = {
  name: "",
  priority: "",
  cash_flow: true,
}

export default AccountForm
