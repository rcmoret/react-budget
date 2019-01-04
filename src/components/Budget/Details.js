import React, { Component } from 'react'
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  render() {
    return (
      <div className="per-details">
        <div className="detail-group">
          <div className="title">Budgeted</div>
          <div className="per-detail">
            <div className="description">
              Per Day:
            </div>
            <div className="amount">
              {MoneyFormatter(this.state.budgeted_per_day)}
            </div>
          </div>
          <div className="per-detail">
            <div className="description">
              Per Week:
            </div>
            <div className="amount">
              {MoneyFormatter(this.state.budgeted_per_week)}
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
              {MoneyFormatter(this.state.remaining_per_day)}
            </div>
          </div>
          <div className="per-detail">
            <div className="description">
              Per Week:
            </div>
            <div className="amount">
              {MoneyFormatter(this.state.remaining_per_week)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Details
