import React from "react";
import { connect } from "react-redux"
import WeeklyAmountInput from "./WeeklyAmountInput"
import WeeklyAmountContainer from "./WeeklyAmountContainer"

const WeeklyAmount = (props) => {
  const {
    id,
    absolute,
    amount,
    budgetCategoryId,
    difference,
    errors,
    expense,
    floatAmount,
    overUnderBudget,
    showDetail,
    spent,
    updateItem,
  } = props

  if (updateItem) {
    return (
      <WeeklyAmountInput
        id={id}
        amount={amount}
        budgetCategoryId={budgetCategoryId}
        errors={errors}
        floatAmount={floatAmount}
        spent={spent}
      />
    )
  } else {
    return (
      <WeeklyAmountContainer
        id={id}
        absolute={absolute}
        amount={amount}
        difference={difference}
        expense={expense}
        overUnderBudget={overUnderBudget}
        showDetail={showDetail}
      />
    )
  }
}

export default connect((_state, ownProps) => ownProps)(WeeklyAmount)
