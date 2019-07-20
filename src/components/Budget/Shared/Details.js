import React from 'react'
import MoneyFormatter from '../../../functions/MoneyFormatter'

const Details = (props) => (
  <div className="per-details">
    <div className="detail-group">
      <div className="title">Budgeted</div>
      <div className="per-detail">
        <div className="description">
          Per Day:
        </div>
        <div className="amount">
          {MoneyFormatter(props.budgetedPerDay, { absolute: true })}
        </div>
      </div>
      <div className="per-detail">
        <div className="description">
          Per Week:
        </div>
        <div className="amount">
          {MoneyFormatter(props.budgetedPerWeek, { absolute: true })}
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
          {MoneyFormatter(props.remainingPerDay, { absolute: true })}
        </div>
      </div>
      <div className="per-detail">
        <div className="description">
          Per Week:
        </div>
        <div className="amount">
          {MoneyFormatter(props.remainingPerWeek, { absolute: true })}
        </div>
      </div>
    </div>
  </div>
)

export default Details
