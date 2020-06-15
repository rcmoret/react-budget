import React from "react"
import { connect } from "react-redux"

import { created, resetForm, toggleShowNewForm, updateNew } from "./actions"
import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { post } from "../../functions/ApiClient"

import Icon from "../Icons/Icon"
import Form from "./Form/Form"
import { Link } from "react-router-dom"

const New = (props) => {
  const {
    apiKey,
    cash_flow,
    dispatch,
    name,
    priority,
    showNewForm,
  } = props

  const showForm = (e) => {
    e.preventDefault()
    dispatch(resetForm())
    const action = toggleShowNewForm({ showForm: true })
    dispatch(action)
  }

  const closeForm = (e) => {
    e.preventDefault()
    const action = toggleShowNewForm({ showForm: false })
    dispatch(action)
  }

  const updateCashFlow = () => {
    const action = updateNew({ cash_flow: !cash_flow })
    dispatch(action)
  }

  const updateAccountProps = (e) => {
    const action = updateNew({ [e.target.name]: e.target.value })
    dispatch(action)
  }

  const submitForm = () => {
    const url = ApiUrlBuilder(["accounts"], { key: apiKey })
    const body = JSON.stringify({ name: name, priority: priority, cash_flow: cash_flow })
    const onSuccess = (data) => {
      dispatch(created(data))
      dispatch(resetForm())
    }
    const onFailure = data => console.log({ body: body, data: data })
    post(url, body, onSuccess, onFailure)
  }

  if (showNewForm) {
    return (
      <Form
        {...props}
        closeForm={closeForm}
        submitForm={submitForm}
        title="Add New"
        updateAccountProps={updateAccountProps}
        updateCashFlow={updateCashFlow}
      />
    )
  } else {
    return(
      <div className="account-edit">
        <div>
          <h3>
            <Link to="#" onClick={showForm}>
              <Icon className="fas fa-plus" /> Add new
            </Link>
          </h3>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    apiKey: state.apiKey.apiKey,
    ...state.accounts.newAccount,
    showNewForm: state.accounts.showNewForm
  }
}

export default connect(mapStateToProps)(New)
