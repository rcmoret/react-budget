import React from "react"

import { budget as copy } from "../../../../locales/copy"
import { titleize } from "../../../../locales/functions"

import MoneyFormatter from "../../../../functions/MoneyFormatter"

export default ({ amount, errors, remaining }) => {
  const total = -1 * (remaining - (amount * 100))

  if (errors.length > 0 || total === 0) {
    return null
  }

  return (
    <div className="total">
      <div>
        <em>{titleize(copy.finalize.appliedToExtra)}:</em>
      </div>
      <div>
        <em>({MoneyFormatter(total, { absolute: false })})</em>
      </div>
    </div>
  )
}

