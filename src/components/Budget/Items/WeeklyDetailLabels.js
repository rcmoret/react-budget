import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

export default ({ descriptor, showDetail }) => {
  if (showDetail) {
    return (
      <div>
        <div className="spent-or-deposited">
          {descriptor}
        </div>
        <div className="budget-item-difference">
          {titleize(copy.shared.remaining)}
        </div>
      </div>
    )
  } else {
    return null
  }
}
