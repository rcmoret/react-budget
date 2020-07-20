import React from "react"
import { connect } from "react-redux"

import Errors from "./Errors"

const MessageBanner = (props) => {
  const { errorCount } = props
  if (errorCount > 0) {
    return (
      <div className="top-level-messages">
        <Errors {...props} />
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = state => {
  const groupedErrors = state.messages.errors.reduce((array, err) => {
    const keys = Object.keys(err.messages)
    return [...array, ...keys.map(key => ({ status: key, messages: err.messages[key], type: err.type }))]
  }, [])

  const types = [...new Set([...groupedErrors.map(err => err.type)])]
  const errorsByType = types.reduce((object, type) => {
    object[type] = groupedErrors.filter(err => err.type === type)

    return object
  }, {})

  const keys = Object.keys(errorsByType)
  const errors = keys.reduce((object, key) => {
    const tuples = errorsByType[key]
    const statuses = tuples.map(tup => tup.status)
    const combinedStatuses = statuses.reduce((obj, status) => {
      obj[status] = tuples
        .filter(tup => tup.status === status)
        .reduce((list, tup) => [...new Set([...list, ...tup.messages])], [])
      return obj
    }, {})
    object[key] = combinedStatuses
    return object
  }, {})

  const errorCount = groupedErrors.reduce((sum, object) => sum + object.messages.length, 0)

  return {
    errors: errors,
    errorCount: errorCount,
    keys: keys,
  }
}

export default connect(mapStateToProps)(MessageBanner)
