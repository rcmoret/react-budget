import React from "react"
import { connect } from "react-redux"

import { toggleEditForm } from "../../../actions/transactions"

import { Link } from "react-router-dom"

const EditLink = ({ onClick }) => (
  <div className="transaction-edit-button">
    <Link
      className="far fa-edit"
      to="#"
      onClick={onClick}
    />
  </div>
)

const mapStateToProps = (_state, ownProps) => ownProps
export default connect(mapStateToProps)(EditLink)
