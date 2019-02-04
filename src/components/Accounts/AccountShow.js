import React from "react"
import { connect } from "react-redux"
import { editItem, updateItem } from "../../actions/accounts"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import AccountFormContainer from "./AccountFormContainer"
import AccountContainer from "./AccountContainer"

const AccountShow = (props) => {
  const showForm = (e) => {
    e.preventDefault()
    props.dispatch(editItem({ ...props, showForm: true }))
  }

  const closeForm = (e) => {
    e.preventDefault()
    const resetProps = props.originalProps || props
    props.dispatch(editItem({ ...resetProps, showForm: false }))
  }

  const updateName = (e) => {
    props.dispatch(editItem({ id: props.id, name: e.target.value }))
  }

  const updatePriority = (e) => {
    props.dispatch(editItem({ id: props.id, priority: e.target.value }))
  }

  const updateCashFlow = (e) => {
    props.dispatch(editItem({ id: props.id, cash_flow: !props.cash_flow }))
  }

  const resetForm = (e) => {
    const originalProps = props.originalProps || props
    props.dispatch(editItem({ ...originalProps, originalProps: null }))
  }

  const submitForm = (_e) => {
    const url = ApiUrlBuilder(["accounts", props.id])
    const body = {
      name: props.name,
      priority: props.priority,
      cash_flow: props.cash_flow,
    }
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
    .then(data => props.dispatch(updateItem(data)))
    .then(() => props.dispatch(editItem({ id: props.id, showForm: false })))
  }

  if (props.showForm) {
    return (
      <AccountFormContainer
        {...props}
        updateName={updateName}
        updatePriority={updatePriority}
        updateCashFlow={updateCashFlow}
        resetForm={resetForm}
        closeForm={closeForm}
        submitForm={submitForm}
      />
    )
  } else {
    return (
      <AccountContainer
        {...props}
        showForm={showForm}
      />
    )
  }
}

export default connect((_state, ownProps) => ownProps)(AccountShow)
