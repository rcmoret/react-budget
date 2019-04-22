import React, { Component } from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { itemsFetched } from "../../actions/budget"
import { Link } from "react-router-dom"

import BudgetInfo from "./Info"
import MonthlyItems from "./Items/MonthlyItems"
import SetUpButton from "./SetUpButton"
import WeeklyItems from "./Items/WeeklyItems"

class BudgetIndex extends Component {
  componentWillMount() {
    if (!this.props.itemsFetched) {
      const { month, year } = this.props
      const url = ApiUrlBuilder(["budget", "items"], { month: month, year: year })
      fetch(url)
        .then(response => response.json())
        .then(data => this.props.dispatch(itemsFetched(data)))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { month, year } = this.props
    if (!(month === nextProps.month && year === nextProps.year)) {
      const url = ApiUrlBuilder(["budget", "items"], { month: nextProps.month, year: nextProps.year })
      fetch(url)
        .then(response => response.json())
        .then(data => this.props.dispatch(itemsFetched(data)))
    }
  }

  render() {
    return (
      <div className="budget">
        <BudgetInfo />
        <WeeklyItems />
        <MonthlyItems />
        <nav>
          <SetUpButton
            month={this.props.month}
            year={this.props.year}
            isFuture={this.props.isFuture}
            requiresSetUp={!this.props.metadata.is_set_up}
          />
          <div>
            <Link to="/budget/categories">
              <div className="category-link">
                <h3>Manage Categories</h3>
              </div>
            </Link>
          </div>
          <Link to="/budget/icons">
            <div className="icon-link">
              <h3>Manage Icons</h3>
            </div>
          </Link>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const today = new Date()
  const month = parseInt(ownProps.match.params.month || today.getMonth() + 1)
  const year = parseInt(ownProps.match.params.year || today.getFullYear())
  const isFuture = (year > today.getFullYear() || (year === today.getFullYear() && month > (today.getMonth() + 1)))
  return { ...state.budget, month: month, year: year, isFuture: isFuture }
}

export default connect(mapStateToProps)(BudgetIndex)
