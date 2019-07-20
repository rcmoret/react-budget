import React from "react";
import MoneyFormatter from "../../../functions/MoneyFormatter"

export default (props) => {
  if (props.showDetail) {
    return (
      <div className="transaction subtransaction-show">
        <div className="left-icon">
        </div>
        <div className="clearance-date">
        </div>
        <div className="description">
          {props.description}
        </div>
        <div className="amount">
          {MoneyFormatter(props.amount)}
        </div>
        <div className="balance">
        </div>
        <div className="budget-categories">
          {props.budget_category}
        </div>
      </div>
    )
  } else {
    return null
  }
}
