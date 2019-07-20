import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { editWeeklyItem, updateWeeklyItem } from "../../../actions/budget"
import { decimalToInt } from "../../../functions/MoneyFormatter"
import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"

const WeeklyAmountInput = (props) => {
  const {
    id,
    amount,
    budget_category_id,
    dispatch,
    floatAmount,
    month,
    spent,
    year,
  } = props

  const handleChange = (e) => {
    e.preventDefault()
    const difference = decimalToInt(e.target.value) - spent
    const action = editWeeklyItem({
      id: id,
      floatAmount: e.target.value,
      difference: difference
    })
    dispatch(action)
  }

  const reset = (e) => {
    e.preventDefault()
    const difference = amount - spent
    const action = editWeeklyItem({
      id: id,
      floatAmount: (amount / 100.0).toFixed(2),
      difference: difference,
      updateItem: false,
    })
    dispatch(action)
  }

  const handleKeyDown = (e) => {
    if (e.which !== 13) {
      return
    } else if (e.target.value === (amount / 100.0).toFixed(2)) {
      reset(e)
    } else {
      saveChange(e)
    }
  }

  const saveChange = (e) => {
    e.preventDefault()
    const body = {
      amount: decimalToInt(floatAmount),
      month: month,
      year: year,
    }
    const url = ApiUrlBuilder(["budget/categories", budget_category_id, "items", id])
    fetch(url,
      {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then(response => response.json())
      .then(data => props.dispatch(updateWeeklyItem({
        ...data,
        floatAmount: null,
        updateItem: false
      })))
  }


  return (
    <div className="budget-item-amount">
      <input
        name="amount"
        value={floatAmount}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        autcomplete="false"
        autoFocus
      />
      {" "}
      <Link to="#" onClick={saveChange} className="fas fa-check" />
      {" "}
      <Link to="#" onClick={reset} className="fas fa-times" />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    month: state.budget.metadata.month,
    year: state.budget.metadata.year,
    ...ownProps,
  }
}

export default connect(mapStateToProps)(WeeklyAmountInput)
