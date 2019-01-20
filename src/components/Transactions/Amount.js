import React from "react"
import MoneyFormatter from "../../shared/Functions/MoneyFormatter"

const Amount = (props) => (
  <div className="amount">
    {MoneyFormatter(props.amount)}
  </div>
)

export default Amount
