import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { editMonthlyItem, updateMonthlyItem } from "../../../actions/budget"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"

const MonthlyAmountInput = (props) => {
  const floatAmount = props.floatAmount || (props.amount / 100.0).toFixed(2)

  const handleChange = (e) => {
    e.preventDefault()
    const newValue = e.target.value
    props.dispatch(editMonthlyItem({
      id: props.id,
      floatAmount: newValue
    }))
  }

  const reset = (e) => {
    e.preventDefault()
    props.dispatch(editMonthlyItem({
      id: props.id,
      floatAmount: ((props.amount / 100.0).toFixed(2)),
      updateItem: false
    }))
  }

  const saveChange = (e) => {
    e.preventDefault()
    const body = {
      amount: decimalToInt(props.floatAmount),
      month: props.month,
      year: props.year,
    }
    const url = ApiUrlBuilder(["budget", "categories", props.budget_category_id, "items", props.id])
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
      .then(data => {
        props.dispatch(updateMonthlyItem({...data, floatAmount: null, updateItem: false }))
      })
  }

  return (
    <div className="budget-item-amount">
      <input
       name="amount"
       value={floatAmount}
       onChange={handleChange}
       autcomplete="false"
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

export default connect(mapStateToProps)(MonthlyAmountInput)
