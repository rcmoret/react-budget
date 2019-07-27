import React from "react"

import Subtransaction from "./Subtransaction"

export default ({ showDetail, subtransactions }) => {
  if (showDetail) {
    return (
      subtransactions.map(sub => {
        return (
          <Subtransaction
            key={sub.id}
            showDetail={showDetail}
            {...sub}
          />
        )
      })
    )
  } else {
    return null
  }
}
