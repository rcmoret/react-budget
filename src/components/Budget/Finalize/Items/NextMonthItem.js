import React from "react"

import { budget as copy } from "../../../../locales/copy"

import MoneyFormatter from "../../../../functions/MoneyFormatter"

export default (props) => {
  const {
    monthly,
    nextItem,
    nextMonthString,
  } = props

  if (!nextItem && monthly) {
    return null
  }

  const amount = nextItem ? nextItem.amount : 0

  return (
    <div className="budgeted">
      <div>
        {copy.finalize.budgetedFor(nextMonthString)}:
      </div>
      <div className="amount">
        {MoneyFormatter(amount, { absolute: false })}
      </div>
    </div>
  )
}

