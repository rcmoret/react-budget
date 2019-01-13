import React, { Component } from 'react';
import ApiUrlBuilder from '../../shared/Functions/ApiUrlBuilder'

class NewBudgetCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {
        name: '',
        default_amount: '',
      },
      ...props,
    }
    this.createNewCategory = this.createNewCategory.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateDefaultAmount = this.updateDefaultAmount.bind(this)
    this.updateExpense = this.updateExpense.bind(this)
    this.updateMonthly = this.updateMonthly.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.categoryBody = this.categoryBody.bind(this)
  }

  updateName(ev) {
    const { category } = this.state
    category['name'] = ev.target.value
    this.setState({ category: category })
  }

  updateDefaultAmount(ev) {
    const { category } = this.state
    category['default_amount'] = ev.target.value
    this.setState({ category: category })
  }

  updateExpense(ev) {
    const { category } = this.state
    category['expense'] = ev.target.value
    this.setState({ category: category })
  }

  updateMonthly(ev) {
    const { category } = this.state
    category['monthly'] = ev.target.value
    this.setState({ category: category })
  }

  resetForm() {
    this.setState({
      category: {
        name: '',
        default_amount: '',
        expense: null,
        monthly: null,
      }
    })
  }

  categoryBody() {
    const body = {
      name: this.state.category.name,
      default_amount: Math.floor(parseFloat(this.state.category.default_amount) * 100),
      monthly: this.state.category.monthly,
      expense: this.state.category.expense,
    }
    return JSON.stringify(body)
  }

  createNewCategory(ev) {
    fetch(ApiUrlBuilder(['budget', 'categories']),
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: this.categoryBody()
        })
        .then(response => response.json())
        .then(data => this.state.onSave(data))
        .then(() => this.resetForm())
  }

  render() {
    const { name, default_amount, expense, monthly } = this.state.category
    return (
      <div>
        <label>Name</label>
        <input type="text" name="category[name]" onChange={this.updateName} value={name} />
        <label>Default Amount</label>
        <input type="text" name="category[default_amount]" onChange={this.updateDefaultAmount} value={default_amount} />
        <label>Expense</label>
        <input type="radio"
         name="category[expense]"
         value="true"
         onChange={this.updateExpense}
         checked={expense === "true" ? "checked" : ""}
         />
        <label>Revenue</label>
        <input type="radio"
         name="category[expense]"
         value="false"
         onChange={this.updateExpense}
         checked={expense === "false" ? "checked" : ""}
         />
        <label>Monthly</label>
        <input type="radio"
         name="category[monthly]"
         value="true"
         onChange={this.updateMonthly}
         checked={monthly === "true" ? "checked" : ""}
         />
        <label>Weekly</label>
        <input type="radio"
         name="category[monthly]"
         value="false"
         onChange={this.updateMonthly}
         checked={monthly === "false" ? "checked" : ""}
         />
        <br/>
        <button type="submit" onClick={this.createNewCategory}>
          Create
        </button>
      </div>
    )
  }
}

export default NewBudgetCategory
