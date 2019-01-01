import React, { Component } from 'react';
import Discretionary from './Discretionary'
import WeeklyItem from './WeeklyItem';
import API_URL from '../../shared/Constants/Api'

class WeeklyItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
    this.revenues = this.revenues.bind(this)
    this.expenses = this.expenses.bind(this)
  }

  componentWillMount() {
    fetch(API_URL + '/budget/weekly_items')
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
      <div className="weekly-items">
        <h3>Weekly Items</h3>
        <hr/>
        <h4>Discretionary</h4>
        <div className="budget-group">
          <Discretionary />
        </div>
        {this.revenues().length > 0 && <h4>Revenues</h4>}
        <div className="budget-group">
          {this.revenues().map((item) =>
            <WeeklyItem
              key={item.id}
              {...item}
            />
           )
          }
        </div>
        {this.expenses().length > 0 && <h4>Expenses</h4>}
        <div className="budget-group">
          {this.expenses().map((item) =>
            <WeeklyItem
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

export default WeeklyItems;
