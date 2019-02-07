import React from "react"
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter'

const Amount = (props) => {
  if (props.showDetail) {
    return (
      <span>
        {MoneyFormatter(props.amount, { absolute: true })}
      </span>
    )
  } else {
    return (
      <span>
        {MoneyFormatter(props.total_remaining, { absolute: true })}
      </span>
    )
  }
}

export default Amount
