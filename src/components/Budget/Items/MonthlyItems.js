import React, { Component } from 'react';
import MonthlyGroup from "./MonthlyGroup"
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder'

class MonthlyItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.revenues = this.revenues.bind(this)
    this.expenses = this.expenses.bind(this)
  }

  componentWillMount() {
    fetch(ApiUrlBuilder(['budget', 'monthly_items']))
      .then(response => response.json())
      .then(data => this.setState({
        items: data
      })
     )
  }

  revenues() {
    return this.state.items.filter((item) => !item.expense)
  }

  expenses() {
    return this.state.items.filter((item) => item.expense)
  }

  render() {
    return(
      <div className="monthly-items">
        <h3>Monthly Items</h3>
        <hr/>
        <MonthlyGroup collection={this.revenues()} title="Revenues" />
        <MonthlyGroup collection={this.expenses()} title="Expenses" />
      </div>
    )
  }
}

MonthlyItems.defaultProps = {
  items: [],
}

export default MonthlyItems;
