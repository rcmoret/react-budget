import React from 'react'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'

const Details = (props) => (
  <div className="per-details">
    <div className="detail-group">
      <div className="title">Budgeted</div>
      <div className="per-detail">
        <div className="description">
          Per Day:
        </div>
        <div className="amount">
          {MoneyFormatter(props.budgeted_per_day)}
        </div>
      </div>
      <div className="per-detail">
        <div className="description">
          Per Week:
        </div>
        <div className="amount">
          {MoneyFormatter(props.budgeted_per_week)}
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
          {MoneyFormatter(props.remaining_per_day)}
        </div>
      </div>
      <div className="per-detail">
        <div className="description">
          Per Week:
        </div>
        <div className="amount">
          {MoneyFormatter(props.remaining_per_week)}
        </div>
      </div>
    </div>
  </div>
)

export default Details
