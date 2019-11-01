import React from "react"
import { connect } from "react-redux"

import { transfer as copy } from "../../locales/copy"
import { deleted } from "./actions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"

import { Link } from "react-router-dom"

const DeleteButton = ({ amount, fromAccountId, dispatch, id, toAccountId }) => {
  const onClick = (e) => {
    e.preventDefault()
    const confirmation = window.confirm(copy.deleteConfirmationMessage)
    if (confirmation) {
      const url = ApiUrlBuilder(["transfers", id])
      fetch(url, { method: "delete" })
        .then(() => dispatch(deleted({
          id: id,
          amount: amount,
          fromAccountId: fromAccountId,
          toAccountId: toAccountId,
        })))
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

const mapStateToProps = (_state, ownProps) => {
  return { id: ownProps.id }
}

export default connect(mapStateToProps)(DeleteButton)
