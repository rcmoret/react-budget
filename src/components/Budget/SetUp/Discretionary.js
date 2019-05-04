import React from "react"

import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

export default ({ amount }) => (
  <div className="setup-discretionary">
    <div className="name">
      <strong>Discretionary: </strong>
    </div>
    <div className="amount">
      {MoneyFormatter(amount, { absolute: false })}
    </div>
  </div>
)
