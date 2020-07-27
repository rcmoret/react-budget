import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { editWeeklyItem, removeWeeklyItem } from "../../../actions/budget"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { deleteRequest } from "../../../functions/ApiClient"
import formatter from "../../../functions/DateFormatter"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"

import Caret from "../Shared/Caret"
import DeleteButton from "../Shared/DeleteButton"
import Icon from "../../Icons/Icon"
import WeeklyAmount from "./WeeklyAmount"
import WeeklyAmountDetails from "./WeeklyAmountDetails"
import WeeklyDetail from "./WeeklyDetail"
import WeeklyDetailLabels from "./WeeklyDetailLabels"

const WeeklyItem = (props) => {
  const {
    deposited,
    minus,
    plus,
  } = copy.shared

  const {
    id,
    amount,
    budget_category_id,
    daysRemaining,
    difference,
    dispatch,
    icon_class_name,
    expense,
    name,
    overUnderBudget,
    month,
    showDetail,
    spent,
    totalDays,
    transaction_count,
    updateItem,
    year,
  } = props

  const {
    deleteConfirmationMessage,
  } = copy.item

  const expandDetail = (e) => {
    e.preventDefault()
    dispatch(editWeeklyItem({ id: props.id, showDetail: true }))
  }

  const collapseDetail = (e) => {
    e.preventDefault()
    dispatch(editWeeklyItem({ id: props.id, showDetail: false }))
  }

  const deleteItem = (e) => {
    e.preventDefault()
    const dateString = formatter({ month: month, year: year, format: "shortMonthYear" })
    const confirmation = window.confirm(deleteConfirmationMessage(name, dateString))
    if (confirmation) {
      const url = ApiUrlBuilder({
        route: "budget-item-show",
        id: id,
        budgetCategoryId: budget_category_id,
      })
      const event = EventMessageBuilder({
        eventType: "budget-item-delete",
        id: id,
        category: name,
        amount: amount,
        month: month,
        year: year
      })
      deleteRequest(url, event, () => dispatch(removeWeeklyItem({ id: id })))
    }
  }

  // expense & >  0 -- reinvestment  -- deposited / +
  // revenue & >= 0 -- most revenues -- deposited / -
  // expense & <= 0 -- most expenses -- spent     / -
  // revenue & <  0 -- travel claim  -- spent     / -
  const descriptor = spent > 0 ? deposited : copy.shared.spent
  const operator = spent > 0  && props.expense ? plus : minus
  const diffOperator = !overUnderBudget ? "" : (expense ? minus : plus)
  const deletable = transaction_count === 0
  const budgetedPerDay = Math.floor(amount / totalDays)
  const budgetedPerWeek = (budgetedPerDay * 7)
  const remainingPerDay = Math.floor(props.remaining / daysRemaining)
  const remainingPerWeek = (remainingPerDay * 7)

  return (
    <div className="budget-item">
      <div className="wrapper">
        <div className="caret">
          <Caret
            showDetail={showDetail}
            expandDetail={expandDetail}
            collapseDetail={collapseDetail}
          />
        </div>
        <div className="budget-item-description">
          <div className="item-name">
            {name}
            { " " }
            <Icon className={icon_class_name} />
          </div>
          <WeeklyDetailLabels
            descriptor={descriptor}
            showDetail={showDetail}
          />
        </div>
        <div className="budget-item-amounts">
          <WeeklyAmount
            expandDetail={expandDetail}
            absolute={true}
            {...props}
          />
          <WeeklyAmountDetails
            difference={difference}
            diffOperator={diffOperator}
            operator={operator}
            showDetail={showDetail}
            spent={spent}
          />
        </div>
        <div className="item-delete-button">
          <DeleteButton
            deletable={deletable}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        </div>
      </div>
      <WeeklyDetail
        {...props}
        budgetedPerDay={budgetedPerDay}
        budgetedPerWeek={budgetedPerWeek}
        remainingPerDay={remainingPerDay}
        remainingPerWeek={remainingPerWeek}
      />
    </div>
  )
}

const mapStateToProps = (_state, ownProps) => ownProps

export default connect(mapStateToProps)(WeeklyItem)
