import React, { Component } from 'react';
import Discretionary from '../Discretionary/Discretionary'
import WeeklyItem from './WeeklyItem';
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder'

class Group extends Component {
  constructor(props) {
    this.state = {
      ...props
    }
  }

  render() {
    if (this.state.items.length > 0) {
      return (
        <div className="budget-group">
          <h4>{this.state.title}</h4>
          {this.state.items.map((item) =>
            <WeeklyItem
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
}

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
    fetch(ApiUrlBuilder(['budget', 'weekly_items']))
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
        <div className="budget-group">
          <h4>Discretionary</h4>
          <Discretionary />
        </div>
        <Group items={this.revenues()} title="Revenues" />
        <Group items={this.expenses()} title="Expenses" />
      </div>
    )
  }
}

export default WeeklyItems
