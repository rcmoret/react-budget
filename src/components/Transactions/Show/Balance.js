import React from "react"
import MoneyFormatter from "../../../functions/MoneyFormatter"

export default (props) => (
  <div className="balance">
    {MoneyFormatter(props.balance)}
  </div>
)
