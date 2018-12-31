import React, { Component } from 'react';

class NewBudgetCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      ...props,
    }
    this.createNewCategory = this.createNewCategory.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateDefaultAmount = this.updateDefaultAmount.bind(this)
    this.updateExpense = this.updateExpense.bind(this)
    this.updateMonthly = this.updateMonthly.bind(this)
  }

  updateName(ev) {
    this.setState({ name: ev.target.value })
  }

  updateDefaultAmount(ev) {
    this.setState(
      { default_amount: Math.floor(ev.target.value * 100) }
    )
  }

  updateExpense(ev) {
    this.setState({ expense: ev.target.value })
  }

  updateMonthly(ev) {
    this.setState({ monthly: ev.target.value })
  }

  createNewCategory(ev) {
    const onSave = this.state.onSave
    ev.preventDefault()
    fetch('http://192.168.1.81:8088/budget/categories',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data => this.state.onSave(data))
  }

  render() {
    return (
      <div>
        <label>Name</label>
        <input type="text" name="category[name]" onChange={this.updateName} />
        <label>Default Amount</label>
        <input type="number" name="category[default_amount]" onChange={this.updateDefaultAmount} />
        <label>Expense</label>
        <input type="radio" name="category[expense]" value="true" onChange={this.updateExpense} />
        <label>Revenue</label>
        <input type="radio" name="category[expense]" value="false" onChange={this.updateExpense} />
        <label>Monthly</label>
        <input type="radio" name="category[monthly]" value="true" onChange={this.updateMonthly} />
        <label>Weekly</label>
        <input type="radio" name="category[monthly]" value="false" onChange={this.updateMonthly} />
        <br/>
        <button type="submit" onClick={this.createNewCategory}>
          Create
        </button>
      </div>
    )
  }
}

export default NewBudgetCategory
