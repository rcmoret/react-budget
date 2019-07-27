import React from "react"

import { transaction as copy } from "../../../locales/copy"

export default ({ budgetExclusion }) => {
  if (budgetExclusion) {
    return (
      <div className="exclusion">
        {copy.budgetExclusion}
      </div>
    )
  } else {
    return null
  }
}
