import React from "react"

import { account as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import Icon from "../../Icons/Icon"

export default ({ id, resetForm }) => {
  if (id) {
    return (
      <button type="reset" className="reset" onClick={resetForm}>
        <Icon className="fas fa-redo-alt fa-flip-horizontal" />{ " " }
        {titleize(copy.resetButtonText)}
      </button>
    )
  } else {
    return null
  }
}
