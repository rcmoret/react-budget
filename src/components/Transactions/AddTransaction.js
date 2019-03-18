import React from "react"
import { connect } from "react-redux"

import { Link } from "react-router-dom"
import { updateNew } from "../../actions/transactions"

import Icon from "../Icons/Icon"
import New from "./New"

const AddTransaction = ({ dispatch, showForm }) => {
  const expandForm = (e) => {
    e.preventDefault()
    const action = updateNew({ showForm: true })
    dispatch(action)
  }

  if (showForm) {
    return (
      <New />
    )
  } else {
    return (
      <div className="transaction-wrapper">
        <div className="transaction">
          <div className="left-icon">
          </div>
          <Link to="#" onClick={expandForm}>
            <Icon className="fas fa-plus" />
            {" "}
            <strong>Add New Transaction</strong>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { showForm } = state.transactions.new
  return { showForm: showForm }
}

export default connect(mapStateToProps)(AddTransaction)
