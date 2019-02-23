import React from "react"
import { connect } from "react-redux"
import { deleted, update } from "../../actions/icons"
import { Link } from "react-router-dom"
import Edit from "./Edit"
import Icon from "./Icon"

const Show = (props) => {
  const { icon } = props
  const { id, class_name, name, showForm } = icon

  const renderForm = (e) => {
    const action = update({ id: id, showForm: true })
    props.dispatch(action)
  }

  const destroy = (e) => {
    e.preventDefault()
    const action = deleted({ id: id })
    props.dispatch(action)
  }

  if (showForm) {
    return (
      <div className="icon">
        <Edit
          icon={icon}
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
          <Link
            to="#"
            onClick={destroy}
            className="fas fa-trash"
          />
        </div>
      </div>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(Show)
