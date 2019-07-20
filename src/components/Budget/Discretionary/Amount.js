import React from "react"
import MoneyFormatter from "../../../functions/MoneyFormatter"

const Amount = (props) => {
  if (props.showDetail) {
    return (
      <span>
        {MoneyFormatter(props.amount)}
      </span>
    )
  } else {
    return (
      <span>
        {MoneyFormatter(props.total_remaining)}
      </span>
    )
  }
}

export default Amount
