import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../locales/copy"

import { deleted, update } from "./actions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { deleteRequest } from "../../functions/ApiClient"
import EventMessageBuilder from "../../functions/EventMessageBuilder"
import { Link } from "react-router-dom"

import Edit from "./Edit"
import Icon from "./Icon"

const Show = ({ dispatch, icon }) => {
  const { id, class_name, name, showForm } = icon

  const renderForm = (e) => {
    e.preventDefault()
    const action = update({ id: id, showForm: true })
    dispatch(action)
  }

  const destroy = (e) => {
    e.preventDefault()
    const confirmation = window.confirm(copy.icon.deleteConfirmationMessage(name))
    const event = EventMessageBuilder({
      eventType: "icon-delete",
      id: id,
      name: name,
    })
    if (confirmation) {
      const url = ApiUrlBuilder({ route: "icon-show", id: id })
      deleteRequest(url, event, () => dispatch(deleted(id)))
    }
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

const mapStateToProps = (_state, ownProps) => ownProps

export default connect(mapStateToProps)(Show)
