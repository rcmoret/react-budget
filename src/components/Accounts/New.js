import React from "react"
import { connect } from "react-redux"

import { created, resetForm, toggleShowNewForm, updateNew } from "./actions"
import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import JsonBody from "../../functions/JsonBody"
import { post } from "../../functions/RestApiClient"

import Icon from "../Icons/Icon"
import Form from "./Form/Form"
import { Link } from "react-router-dom"

const New = (props) => {
  const {
    cashFlow,
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

  const updateName = (e) => {
    dispatch(updateNew({ name: e.target.value }))
  }

  const updatePriority = (e) => {
    const action = updateNew({ priority: e.target.value })
    dispatch(action)
  }

  const updateCashFlow = () => {
    const action = updateNew({ cashFlow: !cashFlow })
    dispatch(action)
  }

  const submitForm = () => {
    const url = ApiUrlBuilder(["accounts"])
    const body = JsonBody("account", { payload: { name: name, priority: priority, cashFlow: cashFlow } })
    const onSuccess = (data) => {
      dispatch(created(data))
      dispatch(resetForm())
    }
    post(url, body, onSuccess)
  }

  if (showNewForm) {
    return (
      <Form
        {...props}
        closeForm={closeForm}
        submitForm={submitForm}
        title="Add New"
        updateName={updateName}
        updatePriority={updatePriority}
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
    ...state.accounts.newAccount,
    showNewForm: state.accounts.showNewForm
  }
}

export default connect(mapStateToProps)(New)
