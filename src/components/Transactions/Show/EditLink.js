import React from "react"
import { connect } from "react-redux"

import { edit } from "../../../actions/transactions"

import { Link } from "react-router-dom"

const EditLink = ({ dispatch, editable, transactionId }) => {
  const revealForm = (e) => {
    e.preventDefault()
    const action = edit({ id: transactionId, showForm: true })
    dispatch(action)
  }

  if (editable) {
    return (
      <div className="transaction-edit-button">
        <Link
          className="far fa-edit"
          to="#"
          onClick={revealForm}
        />
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (_state, ownProps) => ownProps
export default connect(mapStateToProps)(EditLink)
