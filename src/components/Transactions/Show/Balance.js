import React from "react"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

export default (props) => (
  <div className="balance">
    {MoneyFormatter(props.balance)}
  </div>
)
