import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"
import { toggleDiscretionaryDetail } from "../../../actions/budget"

import Amount from "./Amount"
import Caret from "./../Shared/Caret"
import DetailAmounts from "./DetailAmounts"
import DetailLabels from "./DetailLabels"
import DiscretionaryDetail from "./DiscretionaryDetail"
import Icon from "../../Icons/Icon"

const Discretionary = (props) => {
  const {
    aheadOfBudget,
    overBudget,
    title,
  } = copy.discretionary

  const {
    deposited,
    spent,
  } = copy.shared

  const expandDetail = (e) => {
    e.preventDefault()
    props.dispatch(toggleDiscretionaryDetail({ showDetail: true }))
  }

  const collapseDetail = (e) => {
    e.preventDefault()
    props.dispatch(toggleDiscretionaryDetail({ showDetail: false }))
  }

  const descriptor = props.overUnderBudgetAmount > 0 ? aheadOfBudget : overBudget
  const spentOrDeposited = titleize(props.spent >= 0 ? deposited : spent)
  return (
    <div className="budget-item">
      <div className="wrapper">
        <div className="caret">
          <Caret
            showDetail={props.showDetail}
            expandDetail={expandDetail}
            collapseDetail={collapseDetail} />
        </div>
        <div className="budget-item-description">
          <div className="item-name">
            {titleize(title)}
            {" "}
            <Icon className="fas fa-piggy-bank" />
          </div>
          <DetailLabels
            descriptor={descriptor}
            showDetail={props.showDetail}
            spentOrDeposited={spentOrDeposited}
          />
        </div>
        <div className="budget-item-amounts">
          <Amount
            amount={props.amount}
            showDetail={props.showDetail}
            totalRemaining={props.totalRemaining}
          />
          <DetailAmounts
            {...props}
          />
        </div>
        <div className="item-delete-button">
        </div>
      </div>
      <DiscretionaryDetail {...props} />
    </div>
  )
}

export default connect(state => state.budget.discretionary)(Discretionary)
