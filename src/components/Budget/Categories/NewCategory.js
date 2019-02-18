import React from "react"
import { addCategory, updateNewCategory } from "../../../actions/budget"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"
import IconSelect from "./IconSelect"

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

  const onSelectChange = (e) => {
    props.dispatch(updateNewCategory({ icon_id: e.value }))
  }

  const resetForm = (_e) => {
    props.dispatch(updateNewCategory({
      name: '',
      default_amount: '',
      monthly: null,
      expense: null,
      icon_id: null,
    }))
  }

  const postBody = {
    name: props.name,
    default_amount: decimalToInt(props.default_amount),
    monthly: props.monthly,
    expense: props.expense,
    icon_id: props.icon_id,
  }

  const createNewCategory = (e) => {
    const url = ApiUrlBuilder(['budget', 'categories'])
    fetch(url, {
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
  }

  return (
    <div className="budget-category">
      <div className="category-name">
        <input
          type="text"
          name="category[name]"
          onChange={updateName}
          value={props.name}
          placeholder="name"
        />
      </div>
      <div className="category-default-amount">
        <input
          type="text"
          name="category[default_amount]"
          onChange={updateDefaultAmount}
          value={props.default_amount}
          placeholder="default amount"
        />
      </div>
      <div className="category-options">
        <div className="option">
          <div className="label">Monthly</div>
          <input type="radio"
           name="category[monthly]"
           value="true"
           onChange={updateMonthly}
           checked={props.monthly === "true" ? "checked" : ""}
           />
        </div>
        <div className="option">
          <div className="label">Weekly</div>
          <input type="radio"
           name="category[monthly]"
           value="false"
           onChange={updateMonthly}
           checked={props.monthly === "false" ? "checked" : ""}
           />
        </div>
      </div>
      <div className="category-options">
        <div className="option">
          <div className="label">Expense</div>
          <input type="radio"
           name="category[expense]"
           value="true"
           onChange={updateExpense}
           checked={props.expense === "true" ? "checked" : ""}
           />
        </div>
        <div className="option">
          <div className="label">Revenue</div>
          <input type="radio"
           name="category[expense]"
           value="false"
           onChange={updateExpense}
           checked={props.expense === "false" ? "checked" : ""}
           />
        </div>
      </div>
      <IconSelect
        onChange={onSelectChange}
      />
      <div className="category-submit">
        <button type="submit" onClick={createNewCategory}>
          Create
        </button>
      </div>
    </div>
  )
}

export default connect(state => state.budget.newCategory)(NewBudgetCategory)
