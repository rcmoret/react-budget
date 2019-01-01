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
    return (
      <div id='budget'>
        <WeeklyItems />
        <MonthlyItems />
        <div className='category-link'>
          <Link to="/budget/categories">
            <h3>Budget Categories</h3>
          </Link>
        </div>
      </div>
    )
  }
}

export default BudgetIndex;
