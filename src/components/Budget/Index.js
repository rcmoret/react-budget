import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MonthlyItems from './Items/MonthlyItems'
import WeeklyItems from './Items/WeeklyItems'

class BudgetIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updateDiscretionary: false,
    }
  }

  updateDiscretionary() {
    this.setState({ updateDiscretionary: true })
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

export default BudgetIndex
