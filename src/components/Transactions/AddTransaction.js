import React from "react"
import { connect } from "react-redux"

import { transaction as copy } from "../../locales/copy"
import { toggleNewForm } from "../../actions/transactions"

import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"
import New from "./New"

const AddTransaction = ({ dispatch, showForm }) => {
  const expandForm = (e) => {
    e.preventDefault()
    const action = toggleNewForm()
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
            <strong>{copy.addNewButtonText}</strong>
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
