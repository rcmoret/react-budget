import React from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { created, resetForm, toggleShowNewForm, updateNew } from "./actions"
import { Link } from "react-router-dom"
import Form from "./Form/Form"
import Icon from "../Icons/Icon"

const New = (props) => {
  const showForm = (e) => {
    e.preventDefault()
    props.dispatch(resetForm())
    const action = toggleShowNewForm({ showForm: true })
    props.dispatch(action)
  }

  const closeForm = (e) => {
    e.preventDefault()
    const action = toggleShowNewForm({ showForm: false })
    props.dispatch(action)
  }

  const updateName = (e) => {
    props.dispatch(updateNew({ name: e.target.value }))
  }

  const updatePriority = (e) => {
    const action = updateNew({ priority: e.target.value })
    props.dispatch(action)
  }

  const updateCashFlow = (e) => {
    const action = updateNew({ cash_flow: !props.cash_flow })
    props.dispatch(action)
  }

  const submitForm = (_e) => {
    const url  = ApiUrlBuilder(["accounts"])
    const body = {
      name: props.name,
      priority: props.priority,
      cash_flow: props.cash_flow
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    .then(resp => resp.json())
    .then(data => {
      props.dispatch(created(data))
      props.dispatch(resetForm())
    })
  }

  if (props.showNewForm) {
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
