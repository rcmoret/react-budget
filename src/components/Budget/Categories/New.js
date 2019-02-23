import React from "react"
import { created, resetNewForm, updateNew, } from "../../../actions/budget/categories"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { decimalToInt } from "../../../shared/Functions/MoneyFormatter"
import Form from "./Form"

const NewBudgetCategory = (props) => {
  const { newCategory } = props

  const onChange = (e) => {
    const action = updateNew({ [e.target.name]: e.target.value })
    props.dispatch(action)
  }

  const onSelectChange = (e) => {
    const action = updateNew({ icon_id: e.value })
    console.log(e.value)
    props.dispatch(action)
  }

  const onSubmit = (e) => {
    const url = ApiUrlBuilder(["budget", "categories"])
    const postBody = {
      ...newCategory,
      default_amount: decimalToInt(newCategory.default_amount),
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody)
    })
    .then(response => response.json())
    .then(data =>{
      props.dispatch(created(data))
      props.dispatch(resetNewForm())
    })
  }

  const resetForm = (e) => {
    e.preventDefault()
    const action = resetNewForm()
    props.dispatch(action)
  }

  return (
    <Form
      {...newCategory}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onSubmit={onSubmit}
      resetForm={resetForm}
    />
  )
}

const mapStateToProps = (state) => {
  return { newCategory: state.budget.newCategory }
}

export default connect(mapStateToProps)(NewBudgetCategory)
