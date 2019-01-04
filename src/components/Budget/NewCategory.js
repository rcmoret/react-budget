import React, { Component } from 'react';
import ApiUrlBuilder from '../../shared/Functions/ApiUrlBuilder'

class NewBudgetCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {
        default_amount: ''
      },
      ...props,
    }
    this.createNewCategory = this.createNewCategory.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateDefaultAmount = this.updateDefaultAmount.bind(this)
    this.updateExpense = this.updateExpense.bind(this)
    this.updateMonthly = this.updateMonthly.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  // componentWillReceiveProps(nextProps, prevState) {
  //   this.setState(nextProps)
  // }

  updateName(ev) {
    const { category } = this.state
    category['name'] = ev.target.value
    this.setState({ category: category })
  }

  updateDefaultAmount(ev) {
    const { category } = this.state
    category['default_amount'] = Math.floor(parseFloat(ev.target.value) * 100)
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

  createNewCategory(ev) {
    fetch(ApiUrlBuilder('budget', 'categories'),
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.category)
        })
        .then(response => response.json())
        .then(data => this.state.onSave(data))
    this.resetForm()
  }

  render() {
    return (
      <div>
        <label>Name</label>
        <input type="text" name="category[name]" onChange={this.updateName} value={this.state.name} />
        <label>Default Amount</label>
        <input type="text" name="category[default_amount]" onChange={this.updateDefaultAmount} value={this.state.default_amount} />
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
