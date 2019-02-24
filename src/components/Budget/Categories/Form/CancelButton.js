import React from "react"
import { connect } from "react-redux"

import { reset } from "../../../../actions/budget/categories"

const CancelButton = (props) => {
  const { dispatch, id } = props
  const cancel = (e) => {
    e.preventDefault()
    const action = reset({ id: id })
    dispatch(action)
  }

  if (id) {
    return (
      <div className="category-button">
        <button type="cancel" className="cancel" onClick={cancel}>
          Cancel
        </button>
      </div>
    )
  } else {
    return null
  }
}

export default connect((_state, ownProps) => ownProps)(CancelButton)
