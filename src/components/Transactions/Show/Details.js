import React from "react"

import Detail from "./Detail"

export default ({ details, showDetail }) => {
  if (showDetail) {
    return (
      details.map(detail => {
        return (
          <Detail
            key={detail.id}
            showDetail={showDetail}
            {...detail}
          />
        )
      })
    )
  } else {
    return null
  }
}
