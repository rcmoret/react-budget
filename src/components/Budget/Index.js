import React, { Component } from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { itemsFetched } from "../../actions/budget"
import { Link } from "react-router-dom"
import BudgetInfo from "./Info"
import MonthlyItems from "./Items/MonthlyItems"
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
      <div id='budget'>
        <BudgetInfo />
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

const mapStateToProps = (state, ownProps) => {
  const today = new Date()
  const month = ownProps.match.params.month || today.getMonth() + 1
  const year = ownProps.match.params.year || today.getFullYear()
  return { ...state.budget, month: parseInt(month), year: parseInt(year) }
}

export default connect(mapStateToProps)(BudgetIndex)
