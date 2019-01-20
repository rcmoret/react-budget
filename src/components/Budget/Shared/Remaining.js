import React from 'react'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'

const Remaining = (props) => (
  <div className="budget-item-detail">
    <div className="detail-description">Remaining: </div>
    <div className="detail-amount"> {MoneyFormatter(props.remaining)} </div>
  </div>
)

export default Remaining
