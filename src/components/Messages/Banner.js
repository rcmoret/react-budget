import React from "react"
import { connect } from "react-redux"

import Errors from "./Errors"

const MessageBanner = ({ errors }) => {
  if (errors.api.length === 0) {
    return null
  } else {
    return (
      <div className="top-level-messages">
        <Errors
          errors={errors}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({ errors: state.messages.errors })

export default connect(mapStateToProps)(MessageBanner)
