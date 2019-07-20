import React from "react"

import MoneyFormatter from "../../../functions/MoneyFormatter"

export default ({ amount }) => (
  <div className="setup-discretionary">
    <div className="name">
      <strong>Remaining: </strong>
    </div>
    <div className="amount">
      {MoneyFormatter(amount, { absolute: false })}
    </div>
  </div>
)
