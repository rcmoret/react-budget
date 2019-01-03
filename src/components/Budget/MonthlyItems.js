import React, { Component } from 'react';
import MonthlyItem from './MonthlyItem';
import API_URL from '../../shared/Constants/Api'

const Group = (props) => {
  if (props.items.length > 0) {
    return (
      <div className="budget-group">
        <h4>{props.title}</h4>
        {props.items.map((item) =>
          <MonthlyItem
            key={item.id}
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

class MonthlyItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
    this.revenues = this.revenues.bind(this)
    this.expenses = this.expenses.bind(this)
  }

  componentWillMount() {
    fetch(API_URL + '/budget/monthly_items')
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

export default MonthlyItems;
