import React from 'react'
import MoneyFormatter from '../../shared/Functions/MoneyFormatter'

const SpentOrDeposited = (props) => {
  console.log(props)
  if (props.spent > 0) {
    return (
      <div className="budget-item-detail">
        <div className="detail-description">Deposited: </div>
        <div className="detail-amount underscore"> + {MoneyFormatter(props.spent)}</div>
      </div>
    )
  } else {
    return (
      <div className="budget-item-detail">
        <div className="detail-description">
          Spent:
        </div>
        <div className="detail-amount underscore">
          - {MoneyFormatter(props.spent, { absolute: true })}
        </div>
      </div>
    )
  }
}

export default SpentOrDeposited;
