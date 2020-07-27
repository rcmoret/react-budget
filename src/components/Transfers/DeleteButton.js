import React from "react"
import { connect } from "react-redux"

import { transfer as copy } from "../../locales/copy"
import { deleted } from "./actions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { deleteRequest } from "../../functions/ApiClient"
import EventMessageBuilder from "../../functions/EventMessageBuilder"

import { Link } from "react-router-dom"

const DeleteButton = ({ amount, apiKey, from_account_id, dispatch, id, to_account_id }) => {
  const onClick = (e) => {
    e.preventDefault()
    const confirmation = window.confirm(copy.deleteConfirmationMessage)
    if (confirmation) {
      const url = ApiUrlBuilder({ route: "transfer-show", id: id })
      const event = EventMessageBuilder({
        eventType: "transfer-delete",
        id: id,
        fromAccountId: from_account_id,
        toAccountId: to_account_id,
        amount: amount,
      })
      const onSuccess = () => {
        dispatch(deleted({
          id: id,
          amount: amount,
          from_account_id: from_account_id,
          to_account_id: to_account_id,
        }))
      }
      deleteRequest(url, event, onSuccess)
    }
  }

  return (
    <div className="transfer-delete">
      <Link
        to="#"
        onClick={onClick}
        className="fas fa-trash"
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return { id: ownProps.id, apiKey: state.apiKey.apiKey }
}

export default connect(mapStateToProps)(DeleteButton)
