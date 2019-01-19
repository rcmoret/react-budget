import React from 'react'
import { Link } from 'react-router-dom'
import MonthlyItems from './Items/MonthlyItems'
import WeeklyItems from './Items/WeeklyItems'

const BudgetIndex = (_props) => (
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

export default BudgetIndex
