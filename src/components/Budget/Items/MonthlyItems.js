import React, { Component } from "react"
import { connect } from "react-redux"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { monthlyFetched } from "../../../actions/budget"
import MonthlyGroup from "./MonthlyGroup"

class MonthlyItems extends Component {
  componentWillMount() {
    const url = ApiUrlBuilder(['budget', 'monthly_items'])
    fetch(url)
      .then(response => response.json())
      .then(data => this.props.dispatch(monthlyFetched(data)))
  }

  render() {
    const { collection } = this.props
    const revenues = collection.filter(item => !item.expense)
    const expenses = collection.filter(item => item.expense)
    return(
      <div className="monthly-items">
        <h3>Monthly Items</h3>
        <hr/>
        <MonthlyGroup collection={revenues} title="Revenues" />
        <MonthlyGroup collection={expenses} title="Expenses" />
      </div>
    )
  }
}

MonthlyItems.defaultProps = {
  collection: [],
}

export default connect(state => state.budget.monthly)(MonthlyItems)
