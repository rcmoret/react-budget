import React, { Component } from "react"
import { connect } from "react-redux"
import { updateDiscretionary, weeklyFetched } from "../../../actions/budget"
import Discretionary from "../Discretionary/Discretionary"
import WeeklyGroup from "./WeeklyGroup"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"

class WeeklyItems extends Component {
  componentWillMount() {
    const url = ApiUrlBuilder(['budget', 'weekly_items'])
    fetch(url)
      .then(response => response.json())
      .then(data => this.props.dispatch(weeklyFetched(data)))
      .then(() => this.props.dispatch(updateDiscretionary()))
  }

  render() {
    const { collection } = this.props
    const expenses = collection.filter((item) => item.expense)
      .sort((a, b) => (Math.abs(b.amount) - Math.abs(a.amount)))
    const revenues = collection.filter((item) => !item.expense)
      .sort((a, b) => (Math.abs(b.amount) - Math.abs(a.amount)))
    return(
      <div className="weekly-items">
        <h3>Weekly Items</h3>
        <hr/>
        <div className="budget-group">
          <h4>Discretionary</h4>
          <Discretionary />
        </div>
        <WeeklyGroup collection={revenues} title="Revenues" />
        <WeeklyGroup collection={expenses} title="Expenses" />
      </div>
    )
  }
}

WeeklyItems.defaultProps = {
  collection: [],
}

export default connect(state => state.budget.weekly)(WeeklyItems)
