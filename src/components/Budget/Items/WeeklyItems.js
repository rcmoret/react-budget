import React, { Component } from 'react';
import Discretionary from '../Discretionary/Discretionary'
import WeeklyGroup from "./WeeklyGroup"
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder'

class WeeklyItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
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
        <WeeklyGroup collection={this.revenues()} title="Revenues" />
        <WeeklyGroup collection={this.expenses()} title="Expenses" />
      </div>
    )
  }
}

WeeklyItems.defaultProps = {
  items: [],
}

export default WeeklyItems
