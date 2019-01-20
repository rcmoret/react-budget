import React from "react"
import { Link } from "react-router-dom"
import Icon from "../Icons/Icon"

const AddTransactionContainer = (props) => (
  <div className="transaction-wrapper">
    <div className="transaction">
      <div className="left-icon">
      </div>
      <Link to="#" onClick={props.showForm}>
        <Icon className="fas fa-plus" />&nbsp;
        <strong>Add New Transaction</strong>
      </Link>
    </div>
  </div>
)

export default AddTransactionContainer
