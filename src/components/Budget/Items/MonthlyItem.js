import React from "react"
import { connect } from "react-redux"
import { removeMonthlyItem } from "../../../actions/budget"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import formatter from "../../../shared/Functions/DateFormatter"
import DeleteButton from "../Shared/DeleteButton"
import Icon from "../../Icons/Icon"
import MonthlyAmount from "./MonthlyAmount"

const MonthlyItem = (props) => {
  const deleteItem = (e) => {
    e.preventDefault()
    const { budget_category_id, id, name, month, year } = props
    const dateString = formatter({ month: month, year: year, format: "shortMonthYear" })
    const confirmation = window.confirm(`Are you sure you want to delete ${name} for ${dateString}?`)
    if (confirmation) {
      const url = ApiUrlBuilder(["budget", "categories", budget_category_id, "items", id])
      fetch(url, { method: "delete" })
        .then(() => props.dispatch(removeMonthlyItem({ id: id })))
    } else {
      return
    }
  }

  return (
    <div className="budget-item">
      <div className="wrapper">
        <div className="caret">
          <Icon className="fas fa-caret-right" />
        </div>
        <div className="budget-item-description">
          {props.name}
          {" "}
          <Icon className={props.icon_class_name} />
        </div>
        <div className="budget-item-amounts">
          <MonthlyAmount
            absolute={true}
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
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { month, year } = state.budget.metadata
  return { month: month, year: year, ...ownProps }
}

export default connect(mapStateToProps)(MonthlyItem)
