import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MonthlyItems from './MonthlyItems'
import WeeklyItems from './WeeklyItems'

class BudgetIndex extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    return(
      <div>
        <WeeklyItems />
        <MonthlyItems />
        <Link to="/budget/categories">
          Budget Categories
        </Link>
      </div>
    )
  }
}

export default BudgetIndex;
