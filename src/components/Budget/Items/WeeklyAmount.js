import React from "react";
import { connect } from "react-redux"
import WeeklyAmountInput from "./WeeklyAmountInput"
import WeeklyAmountContainer from "./WeeklyAmountContainer"

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
      <WeeklyAmountContainer
        absolute={props.absolute}
        amount={props.amount}
        difference={props.difference}
        expense={props.expense}
        id={props.id}
        overUnderBudget={props.overUnderBudget}
        showDetail={props.showDetail}
      />
    )
  }
}

export default connect((_state, ownProps) => ownProps)(WeeklyAmount)
