import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { editMonthlyItem, removeMonthlyItem } from "../../../actions/budget"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { post } from "../../../functions/ApiClient"
import formatter from "../../../functions/DateFormatter"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"

import Caret from "../Shared/Caret"
import DeleteButton from "../Shared/DeleteButton"
import Icon from "../../Icons/Icon"
import MonthlyAmount from "./MonthlyAmount"
import MonthlyDetail from "./MonthlyDetail"

const MonthlyItem = (props) => {
  const {
    id,
    amount,
    dispatch,
    month,
    name,
    showDetail,
    year,
  } = props

  const deleteItem = (e) => {
    e.preventDefault()
    const dateString = formatter({ month: month, year: year, format: "shortMonthYear" })
    const confirmation = window.confirm(copy.item.deleteConfirmationMessage(name, dateString))
    if (confirmation) {
      const url = ApiUrlBuilder({ route: "budget-items-events-index" })
      const event = EventMessageBuilder({
        eventType: "budget-item-delete",
        id: id,
        category: name,
        amount: amount,
        month: month,
        year: year
      })
      const body = JSON.stringify({
        events: [
          {
            budget_item_id: id,
            event_type: "item_delete",
          },
        ],
      })
      const onSuccess = () => dispatch(removeMonthlyItem({ id: id }))
      post(url, body, { events: [event], onSuccess: onSuccess })
    }
  }

  const expandDetail = () => {
    dispatch(editMonthlyItem({ id: props.id, showDetail: true }))
  }

  const collapseDetail = () => {
    dispatch(editMonthlyItem({ id: props.id, showDetail: false }))
  }

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
          {props.name}
          {" "}
          <Icon className={props.icon_class_name} />
        </div>
        <div className="budget-item-amounts">
          <MonthlyAmount
            absolute={true}
            errors={[]}
            {...props}
            remaining={props.amount}
          />
        </div>
        <div className="item-delete-button">
          <DeleteButton
            deletable={props.deletable}
            deleteItem={deleteItem}
            updateItem={props.updateItem}
          />
        </div>
      </div>
      <MonthlyDetail {...props} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { month, year } = state.budget.metadata

  return {
    month: month,
    year: year,
    ...ownProps
  }
}

export default connect(mapStateToProps)(MonthlyItem)
