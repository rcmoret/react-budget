import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'

class Amount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      originalAmount: props.amount,
      ...props,
      floatAmount: (props.amount / 100.0).toFixed(2),
    }
    this.updateItem = this.updateItem.bind(this)
    this.updateAmount = this.updateAmount.bind(this)
    this.reset = this.reset.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveChange = this.saveChange.bind(this)
    this.afterSave = this.afterSave.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  updateItem() {
    if (!this.state.monthly) {
      this.state.expandDetail()
    }
    this.setState({ updateItem: true, amount: (this.state.amount/100.0) })
  }

  handleChange(ev) {
    this.setState({ floatAmount: ev.target.value })
    this.updateAmount(ev.target.value)
  }

  updateAmount(newAmount) {
    const remaining = (100 * newAmount) - this.state.spent
    this.state.updateParent({ remaining: remaining })
  }

  reset() {
    const amount = this.state.originalAmount
    const remaining = amount - this.state.spent
    this.state.updateParent({ remaining: remaining, showDetail: true })
    this.setState({ updateItem: false })
  }

  afterSave(data) {
    this.state.updateParent(data)
    this.setState({...data, updateItem: false })
  }

  saveChange() {
    const pathSegments = ['budget', 'categories', this.state.category_id, 'items', this.state.id]
    const amount = parseFloat(this.state.floatAmount * 100).toFixed(0)
    fetch(ApiUrlBuilder(pathSegments), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount }),
    })
    .then(response => response.json())
    .then(data => this.afterSave(data))
  }

  render() {
    const { amount, absolute, remaining } = this.state
    if (this.state.updateItem) {
      return (
        <span className="update-amount">
          <Link to="#" onClick={this.saveChange} className="fas fa-check" />
          &nbsp;
          <Link to="#" onClick={this.reset} className="fas fa-times" />
          <br/>
          <input
           name="amount"
           value={this.state.floatAmount}
           onChange={this.handleChange}
           autcomplete="false"
          />
        </span>
      )
    } else if (this.state.showDetail) {
      return (
        <span>
          <Link to="#" onClick={this.updateItem}>
            {MoneyFormatter(amount, { absolute: absolute })}
          </Link>
        </span>
      )
    } else {
      return (
        <span>
          <Link to="#" onClick={this.updateItem}>
            {MoneyFormatter(remaining, { absolute: absolute })}
          </Link>
        </span>
      )
    }
  }
}

export default Amount;
