import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { toggleForm } from "../../actions/transactions"
import Form from "./Form/Form"
import Icon from "../Icons/Icon"

const AddTransaction = ({ dispatch, showForm }) => {
  const expandForm = (e) => {
    e.preventDefault()
    dispatch(toggleForm({ showForm: true }))
  }

  if (showForm) {
    return (
      <Form />
    )
  } else {
    return (
      <div className="transaction-wrapper">
        <div className="transaction">
          <div className="left-icon">
          </div>
          <Link to="#" onClick={expandForm}>
            <Icon className="fas fa-plus" />&nbsp;
            <strong>Add New Transaction</strong>
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { showForm } = state.transactions
  return { showForm: showForm }
}

export default connect(mapStateToProps)(AddTransaction)
