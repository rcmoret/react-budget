import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import MoneyFormatter from "../../../functions/MoneyFormatter"

export default ({ amount }) => (
  <div className="setup-discretionary">
    <div className="name">
      <strong>{titleize(copy.shared.remaining)}: </strong>
    </div>
    <div className="amount">
      {MoneyFormatter(amount, { absolute: false })}
    </div>
  </div>
)
