import React from "react"
import { connect } from "react-redux"

import { reset, toggleNewForm } from "../../../../actions/budget/categories"

const CancelButton = (props) => {
  const {
    id,
    dispatch,
    label,
  } = props

  const cancel = (e) => {
    e.preventDefault()
    const action = reset({ id: id })
    dispatch(action)
  }

  const toggleForm = (e) => {
    e.preventDefault()
    const action = toggleNewForm({ showForm: false })
    dispatch(action)
  }


  if (id) {
    return (
      <div className="category-button">
        <button type="cancel" className="cancel" onClick={cancel}>
          {label}
        </button>
      </div>
    )
  } else {
    return (
      <div className="category-button">
        <button type="cancel" className="cancel" onClick={toggleForm}>
          {label}
        </button>
      </div>
    )
  }
}

export default connect((_state, ownProps) => ownProps)(CancelButton)
