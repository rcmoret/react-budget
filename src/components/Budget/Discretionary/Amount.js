import React from "react"

import MoneyFormatter from "../../../functions/MoneyFormatter"

export default ({ amount, showDetail, totalRemaining }) => {
  if (showDetail) {
    return (
      <span>
        {MoneyFormatter(amount)}
      </span>
    )
  } else {
    return (
      <span>
        {MoneyFormatter(totalRemaining)}
      </span>
    )
  }
}
