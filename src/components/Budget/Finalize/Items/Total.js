import React from "react"

import { budget as copy } from "../../../../locales/copy"

import MoneyFormatter from "../../../../functions/MoneyFormatter"

export default ({ amount, errors, nextItem, nextMonthString }) => {
  if (errors.length > 0) {
    return null
  }

  const nextAmount = nextItem ? nextItem.amount : 0
  const total = nextAmount + ((amount || 0) * 100)
  return (
    <div className="total">
      <div>
        {copy.finalize.updatedAmountFor(nextMonthString)}:
      </div>
      <div>
        {MoneyFormatter(total, { absolute: false })}
      </div>
    </div>
  )
}


