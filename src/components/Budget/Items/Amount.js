import React, { Component } from 'react';
import AmountContainer from "./AmountContainer"
import AmountInput from "./AmountInput"
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder'

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
    const { absolute, amount, floatAmount, remaining, showDetail } = this.state
    if (this.state.updateItem) {
      return (
        <AmountInput
          floatAmount={floatAmount}
          handleChange={this.handleChange}
          reset={this.reset}
          saveChange={this.saveChange}
        />
      )
    } else {
      return (
        <AmountContainer
          absolute={absolute}
          amount={amount}
          remaining={remaining}
          showDetail={showDetail}
          updateItem={this.updateItem}
        />
      )
    }
  }
}

export default Amount;
