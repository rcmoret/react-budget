import React from "react"
import { connect } from "react-redux"
import { toggleDiscretionaryDetail } from "../../../actions/budget"
import Amount from "./Amount"
import Caret from "./../Shared/Caret"
import DetailAmounts from "./DetailAmounts"
import DetailLabels from "./DetailLabels"
import DiscretionaryDetail from "./DiscretionaryDetail"
import Icon from "../../Icons/Icon"

const Discretionary = (props) => {
  const expandDetail = (e) => {
    e.preventDefault()
    props.dispatch(toggleDiscretionaryDetail({ showDetail: true }))
  }

  const collapseDetail = (e) => {
    e.preventDefault()
    props.dispatch(toggleDiscretionaryDetail({ showDetail: false }))
  }

  const descriptor = props.overUnderBudgetAmount > 0 ? "Ahead of Budget" : "Over Budget"
  const spentOrDeposited = props.overUnderBudgetAmount > 0 ? "Deposited" : "Spent"
  return (
    <div className="budget-item">
      <div className="caret">
        <Caret
          showDetail={props.showDetail}
          expandDetail={expandDetail}
          collapseDetail={collapseDetail}
        />
      </div>
      <div className="budget-item-description">
        <div className="item-name">
          Discretionary
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
          total_remaining={props.total_remaining}
        />
        <DetailAmounts
          {...props}
        />
      </div>
      <DiscretionaryDetail {...props} />
    </div>
  )
}

export default connect(state => state.budget.discretionary)(Discretionary)
