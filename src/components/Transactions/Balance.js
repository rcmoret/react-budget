import React from "react"
import MoneyFormatter from "../../shared/Functions/MoneyFormatter"

const Balance = (props) => (
  <div className="balance">
    {MoneyFormatter(props.balance)}
  </div>
)

export default Balance
