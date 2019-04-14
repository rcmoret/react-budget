import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { deleted } from "../../actions/transfers"

import { Link } from "react-router-dom"

const DeleteButton = ({ amount, from_account_id, dispatch, id, to_account_id }) => {
  const onClick = (e) => {
    e.preventDefault()
    const confirmation = window.confirm("Are you sure you want to delete this transfer?")
    if (confirmation) {
      const url = ApiUrlBuilder(["transfers", id])
      fetch(url, { method: "delete" })
        .then(() => dispatch(deleted({
          id: id,
          amount: amount,
          from_account_id: from_account_id,
          to_account_id: to_account_id,
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