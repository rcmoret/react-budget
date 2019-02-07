import React from 'react'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'

const Details = (props) => {
  const { amount, days_remaining, total_days, total_remaining } = props
  const budgetedPerDay = amount / total_days
  const budgetedPerWeek = budgetedPerDay * 7
  const remainingPerDay = total_remaining / days_remaining
  const remainingPerWeek = remainingPerDay * 7

  return (
    <div className="per-details">
      <div className="detail-group">
        <div className="title">Budgeted</div>
        <div className="per-detail">
          <div className="description">
            Per Day:
          </div>
          <div className="amount">
            {MoneyFormatter(budgetedPerDay)}
          </div>
        </div>
        <div className="per-detail">
          <div className="description">
            Per Week:
          </div>
          <div className="amount">
            {MoneyFormatter(budgetedPerWeek)}
          </div>
        </div>
      </div>
      <div className="detail-group">
        <div className="title">Remaining</div>
        <div className="per-detail">
          <div className="description">
            Per Day:
          </div>
          <div className="amount">
            {MoneyFormatter(remainingPerDay)}
          </div>
        </div>
        <div className="per-detail">
          <div className="description">
            Per Week:
          </div>
          <div className="amount">
            {MoneyFormatter(remainingPerWeek)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
