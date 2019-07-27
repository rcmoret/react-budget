import React from "react"

import MoneyFormatter from "../../../functions/MoneyFormatter"

export default ({ amount, showDetail, total_remaining }) => {
  if (showDetail) {
    return (
      <span>
        {MoneyFormatter(amount)}
      </span>
    )
  } else {
    return (
      <span>
        {MoneyFormatter(total_remaining)}
      </span>
    )
  }
}
