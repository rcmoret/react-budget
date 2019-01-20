import React from 'react'
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'

// I think this is correct...
// expense & >  0 -- reinvestment  -- deposited / +
// revenue & >= 0 -- most revenues -- deposited / -
// expense & <= 0 -- most expenses -- spent     / -
// revenue & <  0 -- travel claim  -- spent     / -

const SpentOrDeposited = (props) => {
  const descriptor = props.spent > 0 ? 'Deposited' : 'Spent'
  const operator = props.spent > 0  && props.expense ? '+' : '-'
  return (
    <div className="budget-item-detail">
      <div className="detail-description">
      {descriptor}:
      </div>
      <div className="detail-amount underscore">
      {operator} {MoneyFormatter(props.spent, { absolute: true })}
      </div>
    </div>
  )
}

export default SpentOrDeposited;
