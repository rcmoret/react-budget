import React, { Component } from "react"
import { connect } from "react-redux"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"
import { addCategory, updateNewCategory } from "../../../actions/budget"

const NewBudgetCategory = (props) => {
  const updateName = (e) => {
    props.dispatch(updateNewCategory({ name: e.target.value }))
  }

  const updateDefaultAmount = (e) => {
    props.dispatch(updateNewCategory({ default_amount: e.target.value }))
  }

  const updateExpense = (e) => {
    props.dispatch(updateNewCategory({ expense: e.target.value }))
  }

  const updateMonthly = (e) => {
    props.dispatch(updateNewCategory({ monthly: e.target.value }))
  }

  const resetForm = (_e) => {
    props.dispatch(updateNewCategory(
      {
        name: '',
        default_amount: '',
        monthly: null,
        expense: null
      }
    ))
  }

  const postBody = {
    name: props.name,
    default_amount: decimalToInt(props.default_amount),
    monthly: props.monthly,
    expense: props.expense,
  }

  const createNewCategory = (e) => {
    const url = ApiUrlBuilder(['budget', 'categories'])
    fetch(url,
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody)
        })
        .then(response => response.json())
        .then(data => props.dispatch(addCategory(data)))
        .then(() => resetForm())
  // }
  }


  return (
    <div>
      <label>Name</label>
      <input type="text" name="category[name]" onChange={updateName} value={props.name} />
      <label>Default Amount</label>
      <input type="text" name="category[default_amount]" onChange={updateDefaultAmount} value={props.default_amount} />
      <label>Expense</label>
      <input type="radio"
       name="category[expense]"
       value="true"
       onChange={updateExpense}
       checked={props.expense === "true" ? "checked" : ""}
       />
      <label>Revenue</label>
      <input type="radio"
       name="category[expense]"
       value="false"
       onChange={updateExpense}
       checked={props.expense === "false" ? "checked" : ""}
       />
      <label>Monthly</label>
      <input type="radio"
       name="category[monthly]"
       value="true"
       onChange={updateMonthly}
       checked={props.monthly === "true" ? "checked" : ""}
       />
      <label>Weekly</label>
      <input type="radio"
       name="category[monthly]"
       value="false"
       onChange={updateMonthly}
       checked={props.monthly === "false" ? "checked" : ""}
       />
      <br/>
      <button type="submit" onClick={createNewCategory}>
        Create
      </button>
    </div>
  )
}

NewBudgetCategory.defaultProps = {
  name: '',
  default_amount: '',
  showForm: false,
}

export default connect(state => state.budget.newCategory)(NewBudgetCategory)
