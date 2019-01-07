import React, { Component } from 'react'
import Icon from '../Icons/Icon'
import ApiUrlBuilder from '../../shared/Functions/ApiUrlBuilder'

class NewAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      priority: '',
      cash_flow: true,
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
    const url  = this.state.account_id ? ApiUrlBuilder('accounts', this.state.account_id) : ApiUrlBuilder('accounts')
    fetch(url,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: this.accountBody(),
          }
      )
      .then(resp => resp.json())
      .then(data => this.state.onSave(data))
      .then(() => this.setState({ name: '', priority: '' }))
      .then(() => this.state.closeForm())
  }

  render() {
    return (
      <div className="account-edit">
        <div>
          <h3>
            Add new
          </h3>
          <hr />
          <div className="form-row">
            <div className="label">
              <label>
                Name
              </label>
            </div>
            <div className="input">
              <input type="text" name="account[name]" value={this.state.name} onChange={this.updateName} />
            </div>
          </div>
          <div className="form-row">
            <div className="label">
              <label>
                Priority
              </label>
            </div>
            <div className="input">
              <input type="number" name="account[priority]" value={this.state.priority} onChange={this.updatePriority} />
            </div>
          </div>
          <div className="form-row">
            <div className="label">
              <label>
                Cash Flow
              </label>
            </div>
            <div className="input">
              <input type="checkbox" name="account[cash_flow]" checked={this.state.cash_flow} onChange={this.updateCashFlow} />
            </div>
          </div>
          <div className="form-row">
            <button type="submit" className="submit" onClick={this.submitForm}>
              {this.state.id ? "Update" : "Create"} Account <Icon className="far fa-save" />
            </button>
            &nbsp;
            <button type="cancel" className="cancel" onClick={this.state.closeForm}>
              Cancel <Icon className="fas fa-times" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default NewAccount;
