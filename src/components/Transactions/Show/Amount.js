import React from "react"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"

export default (props) => (
  <div className="amount">
    {MoneyFormatter(props.amount)}
  </div>
)
