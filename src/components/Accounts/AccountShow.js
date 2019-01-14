import React, { Component } from "react"
import { Link } from "react-router-dom"
import AccountEditForm from "./AccountEditForm"
import MoneyFormatter from "../../shared/Functions/MoneyFormatter"

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
        <div className="account-edit">
          <div>
            <h3>
              {this.state.name}
            &nbsp;
              <Link
                to="#"
                className="far fa-edit"
                onClick={this.showForm}
              />
            </h3>
            <div className="cash-flow">
              {this.state.cash_flow ? "Cash Flow" : "Non-Cash Flow"}
            </div>
            <div className="balance">
              Balance: {MoneyFormatter(this.state.balance)}
            </div>
            <div className="priority">
              Priority: {this.state.priority}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default AccountShow
