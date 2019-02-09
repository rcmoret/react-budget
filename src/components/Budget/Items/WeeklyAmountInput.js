import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { editWeeklyItem, updateDiscretionary, updateWeeklyItem } from "../../../actions/budget"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"

const WeeklyAmountInput = (props) => {
  const floatAmount = props.floatAmount || (props.amount / 100.0).toFixed(2)

  const handleChange = (e) => {
    e.preventDefault()
    const newValue = e.target.value
    const remaining = decimalToInt(newValue) - props.spent
    props.dispatch(editWeeklyItem({
      id: props.id,
      floatAmount: newValue,
      remaining: remaining
    }))
  }

  const reset = (e) => {
    e.preventDefault()
    const remaining = props.amount - props.spent
    props.dispatch(editWeeklyItem({
      id: props.id,
      floatAmount: ((props.amount / 100.0).toFixed(2)),
      updateItem: false,
      remaining: remaining
    }))
  }

  const saveChange = (e) => {
    e.preventDefault()
    const body = { amount: decimalToInt(props.floatAmount) }
    const url = ApiUrlBuilder(["budget", "categories", props.categoryId, "items", props.id])
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
    .then(() => props.dispatch(updateDiscretionary()))
  }


  return (
    <span className="update-amount">
      <Link to="#" onClick={saveChange} className="fas fa-check" />
      &nbsp;
      <Link to="#" onClick={reset} className="fas fa-times" />
      <br/>
      <input
       name="amount"
       value={floatAmount}
       onChange={handleChange}
       autcomplete="false"
      />
    </span>
  )
}

export default connect((_state, ownProps) => ownProps)(WeeklyAmountInput)
