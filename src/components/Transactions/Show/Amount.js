import React from "react"
import MoneyFormatter from "../../../functions/MoneyFormatter"

export default (props) => (
  <div className="amount">
    {MoneyFormatter(props.amount)}
  </div>
)
