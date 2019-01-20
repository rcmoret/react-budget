import React from 'react'
import { Link } from "react-router-dom"
import Icon from "../Icons/Icon"

const AddNewRow = (props) => (
  <div className="account-edit">
    <div>
      <h3>
        <Link to="#" onClick={props.showForm}>
          <Icon className="fas fa-plus" /> Add new
        </Link>
      </h3>
    </div>
  </div>
)

export default AddNewRow
