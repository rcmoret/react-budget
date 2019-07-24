import React from "react"
import MoneyFormatter from "../../../functions/MoneyFormatter"

export default ({ balance }) => (
  <div className="balance">
    {MoneyFormatter(balance)}
  </div>
)
