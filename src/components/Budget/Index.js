import React, { Component } from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { itemsFetched } from "../../actions/budget"

import BudgetInfo from "./Info"
import Menu from "./Menu"
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
      <div className="budget">
        <BudgetInfo />
        <WeeklyItems />
        <MonthlyItems />
        <Menu
          month={this.props.month}
          year={this.props.year}
          isFuture={this.props.isFuture}
          requiresSetUp={!this.props.metadata.is_set_up}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const today = new Date()
  const month = parseInt(ownProps.match.params.month || today.getMonth() + 1)
  const year = parseInt(ownProps.match.params.year || today.getFullYear())
  const isFuture = (year > today.getFullYear() || (year === today.getFullYear() && month > (today.getMonth() + 1)))

  return {
    ...state.budget,
    month: month,
    year: year,
    isFuture: isFuture
  }
}

export default connect(mapStateToProps)(BudgetIndex)
