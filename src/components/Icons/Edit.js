import React from "react"
import { connect } from "react-redux"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { update, updated, updateProps } from "../../actions/icons"
import Form from "./Form/Form"

const Edit = (props) => {
  const { id } = props.icon

  const onChange = (e) => {
    const action = updateProps({ id: id, [e.target.name]: e.target.value })
    props.dispatch(action)
  }

  const onSubmit = (e) => {
    const url = ApiUrlBuilder(["icons", id])
    fetch(url, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.icon.updatedProps),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      props.dispatch(updated(data))
      props.dispatch(update({ id: id, showForm: false }))
    })
  }

  const formProps = { ...props.icon, ...props.icon.updatedProps }
  return (
    <Form
      {...formProps}
      buttonText="Update"
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}

export default connect((_state, ownProps) => ownProps)(Edit)
