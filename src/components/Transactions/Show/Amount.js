import React from "react"
import MoneyFormatter from "../../../functions/MoneyFormatter"

export default ({ amount }) => (
  <div className="amount">
    {MoneyFormatter(amount)}
  </div>
)
