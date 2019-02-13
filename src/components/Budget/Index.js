import React, { Component } from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { itemsFetched, updateDiscretionary } from "../../actions/budget"
import { Link } from "react-router-dom"
import MonthlyItems from "./Items/MonthlyItems"
import WeeklyItems from "./Items/WeeklyItems"

class BudgetIndex extends Component {
  componentWillMount() {
    if (!this.props.itemsFetched) {
      const url = ApiUrlBuilder(["budget", "items"])
      fetch(url)
        .then(response => response.json())
        .then(data => this.props.dispatch(itemsFetched(data)))
        .then(() => this.props.dispatch(updateDiscretionary()))
    }
  }

  render() {
    return (
      <div id='budget'>
        <WeeklyItems />
        <MonthlyItems />
        <Link to="/budget/categories">
          <div className="category-link">
            <h3>Manage Budget Categories</h3>
          </div>
        </Link>
      </div>
    )
  }
}

export default connect(state => state.budget)(BudgetIndex)
