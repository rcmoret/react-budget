import React from "react"
import { connect } from "react-redux"
import { resetAccount, update, updated, updateProps } from "./actions"
import Form from "./Form/Form"
import ApiUrlBuilder from "../../functions/ApiUrlBuilder"

const Edit = (props) => {
  const { id } = props

  const closeForm = () => {
    const action = resetAccount({ id: id, showForm: false })
    props.dispatch(action)
  }

  const resetForm = () => {
    const action = resetAccount({ id: id })
    props.dispatch(action)
  }

  const updateName = (e) => {
    e.preventDefault()
    const action = updateProps({ id: id, name: e.target.value })
    props.dispatch(action)
  }

  const updatePriority = (e) => {
    e.preventDefault()
    const action = updateProps({ id: id, priority: e.target.value })
    props.dispatch(action)
  }

  const updateCashFlow = () => {
    const updatedProps = { ...props, ...props.updatedProps }
    const action = updateProps({ id: id, cash_flow: !updatedProps.cash_flow })
    props.dispatch(action)
  }

  const submitForm = () => {
    const url = ApiUrlBuilder(["accounts", id])
    fetch(url, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.updatedProps),
    })
      .then(response => response.json())
      .then(data => {
        props.dispatch(updated(data))
        props.dispatch(update({ id: id, showForm: false }))
      })
  }

  const formProps = { ...props, ...props.updatedProps }
  const title = props.name
  return (
    <Form
      { ...formProps }
      closeForm={closeForm}
      title={title}
      updateName={updateName}
      updatePriority={updatePriority}
      updateCashFlow={updateCashFlow}
      resetForm={resetForm}
      submitForm={submitForm}
    />
  )
}

export default connect((_state, ownProps) => ownProps)(Edit)
