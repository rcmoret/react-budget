import React from "react"
import { connect } from "react-redux"
import { editIcon, updateIcon } from "../../actions/icons"
import { Link } from "react-router-dom"
import Form from "./Form"
import Icon from "./Icon"

const Show = (props) => {
  const { id, class_name, name, showForm } = props

  const icon = {
    id: id,
    class_name: class_name,
    name: name,
  }

  const renderForm = (e) => {
    const action = editIcon({ id: id, showForm: true })
    props.dispatch(action)
  }

  const onChange = (e) => {
    const action = editIcon({ id: id, [e.target.name]: e.target.value })
    props.dispatch(action)
  }

  const onSubmit = (e) => {
    const action = updateIcon({ id: id })
    props.dispatch(action)
  }

  if (showForm) {
    return (
      <div className="icon">
        <Form
          buttonText="Update"
          icon={icon}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      </div>
    )
  } else {
    return (
      <div className="icon">
        <div className="icon-name">
          <Icon className={class_name} />
          {" "}
          {name}
        </div>
        <div className="icon-actions">
          <Link
            to="#"
            className="fas fa-edit"
            onClick={renderForm}
          />
          {" "}
          <Icon className="fas fa-trash" />
        </div>
      </div>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(Show)
