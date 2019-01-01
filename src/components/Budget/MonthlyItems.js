import React, { Component } from 'react';
import MonthlyItem from './MonthlyItem';
import API_URL from '../../shared/Constants/Api'

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
        {this.revenues().length > 0 && <h4>Revenues</h4>}
        <div className="budget-group">
          {this.revenues().map((item) =>
            <MonthlyItem
              key={item.id}
              {...item}
            />
           )
          }
        </div>
        {this.expenses().length > 0 && <h4>Expenses</h4>}
        <div className="budget-group">
          {this.expenses().map((item) =>
            <MonthlyItem
              key={item.id}
              {...item}
            />
           )
          }
        </div>
      </div>
    )
  }
}

export default MonthlyItems;
