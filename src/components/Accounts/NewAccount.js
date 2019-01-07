import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountForm from './AccountForm'
import Icon from '../Icons/Icon';

class NewAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      ...props,
    }
    this.showForm = this.showForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
  }

  showForm(ev) {
    this.setState({ showForm: true })
  }

  closeForm(ev) {
    this.setState({ showForm: false })
  }

  render() {
    if (this.state.showForm) {
      return (
        <AccountForm onSave={this.state.onSave} closeForm={this.closeForm} {...this.state} />
      )
    } else {
      return(
        <div className="account-edit">
          <div>
            <h3>
              <Link to="#" onClick={this.showForm}>
              <Icon className="fas fa-plus" /> Add new
              </Link>
            </h3>
          </div>
        </div>
      )
    }
  }
}

export default NewAccount;
