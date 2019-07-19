import React from "react"
import { connect } from "react-redux"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import formatter from "../../../shared/Functions/DateFormatter"
import { editWeeklyItem, removeWeeklyItem } from "../../../actions/budget"
import Caret from "../Shared/Caret"
import DeleteButton from "../Shared/DeleteButton"
import Icon from "../../Icons/Icon"
import WeeklyAmount from "./WeeklyAmount"
import WeeklyAmountDetails from "./WeeklyAmountDetails"
import WeeklyDetail from "./WeeklyDetail"
import WeeklyDetailLabels from "./WeeklyDetailLabels"

const WeeklyItem = (props) => {
  const expandDetail = (e) => {
    e.preventDefault()
    props.dispatch(editWeeklyItem({ id: props.id, showDetail: true }))
  }

  const collapseDetail = (e) => {
    e.preventDefault()
    props.dispatch(editWeeklyItem({ id: props.id, showDetail: false }))
  }

  const deleteItem = (e) => {
    e.preventDefault()
    const { budget_category_id, id, name, month, year } = props
    const dateString = formatter({ month: month, year: year, format: "shortMonthYear" })
    const confirmation = window.confirm(`Are you sure you want to delete ${name} for ${dateString}?`)
    if (confirmation) {
      const url = ApiUrlBuilder(["budget", "categories", budget_category_id, "items", id])
      fetch(url, { method: "delete" })
        .then(() => props.dispatch(removeWeeklyItem({ id: id })))
    } else {
      return
    }
  }

  // I think this is correct...
  // expense & >  0 -- reinvestment  -- deposited / +
  // revenue & >= 0 -- most revenues -- deposited / -
  // expense & <= 0 -- most expenses -- spent     / -
  // revenue & <  0 -- travel claim  -- spent     / -
  const descriptor = props.spent > 0 ? 'Deposited' : 'Spent'
  const operator = props.spent > 0  && props.expense ? '+' : '-'
  const diffOperator = !props.overUnderBudget ? "" : (props.expense ? "-" : "+")
  const deletable = props.transaction_count === 0

  return (
    <div className="budget-item">
      <div className="wrapper">
        <div className="caret">
          <Caret
            showDetail={props.showDetail}
            expandDetail={expandDetail}
            collapseDetail={collapseDetail}
          />
        </div>
        <div className="budget-item-description">
          <div className="item-name">
            {props.name}
            { " " }
            <Icon className={props.icon_class_name} />
          </div>
          <WeeklyDetailLabels
            descriptor={descriptor}
            showDetail={props.showDetail}
          />
        </div>
        <div className="budget-item-amounts">
          <WeeklyAmount
            expandDetail={expandDetail}
            absolute={true}
            {...props}
          />
          <WeeklyAmountDetails
            difference={props.difference}
            diffOperator={diffOperator}
            operator={operator}
            showDetail={props.showDetail}
            spent={props.spent}
          />
        </div>
        <div className="item-delete-button">
          <DeleteButton
            deletable={deletable}
            deleteItem={deleteItem}
            updateItem={props.updateItem}
          />
        </div>
      </div>
      <WeeklyDetail {...props} />
    </div>
  )
}

export default connect((_state, ownProps) => ownProps)(WeeklyItem)
