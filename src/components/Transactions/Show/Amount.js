import React from "react"
import MoneyFormatter from "../../../functions/MoneyFormatter"

export default ({ amount, details, showDetail }) => {
  if (showDetail) {
    return (
      <div>
        <div className="amount-detail">
          {MoneyFormatter(amount)}
        </div>
        {details.map(detail => (
          <Detail key={detail.id} amount={detail.amount} />
        ))}
      </div>
    )
  } else {
    return (
      <div>
        <div className="amount-detail">
          {MoneyFormatter(amount)}
        </div>
      </div>
    )
  }
}

const Detail = ({ amount }) => (
  <div className="amount-detail detail-show">
    {MoneyFormatter(amount)}
  </div>
)
