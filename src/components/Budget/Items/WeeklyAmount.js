import React from "react";
import { connect } from "react-redux"
import AmountContainer from "./AmountContainer"
import WeeklyAmountInput from "./WeeklyAmountInput"

const WeeklyAmount = (props) => {
  if (props.updateItem) {
    return (
      <WeeklyAmountInput
        amount={props.amount}
        categoryId={props.category_id}
        floatAmount={props.floatAmount}
        id={props.id}
        spent={props.spent}
      />
    )
  } else {
    return (
      <AmountContainer
        absolute={props.absolute}
        amount={props.amount}
        id={props.id}
        remaining={props.remaining}
        showDetail={props.showDetail}
      />
    )
  }
}

export default connect((_state, ownProps) => ownProps)(WeeklyAmount)
