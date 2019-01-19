import React, { Component } from 'react';
import MonthlyItem from './MonthlyItem';
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder'

class Group extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  render() {
    if (this.state.items.length > 0) {
      return (
        <div className="budget-group">
          <h4>{this.state.title}</h4>
          {this.state.items.map((item) =>
            <MonthlyItem
              key={item.id}
              monthly={true}
              {...item}
            />
           )
          }
        </div>
      )
    } else {
      return null
    }
  }
}

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
        <Group items={this.revenues()} title="Revenues" />
        <Group items={this.expenses()} title="Expenses" />
      </div>
    )
  }
}

MonthlyItems.defaultProps = {
  items: [],
}

export default MonthlyItems;
