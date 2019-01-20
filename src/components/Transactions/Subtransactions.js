import React from "react"
import Subtransaction from "./Subtransaction"

const Subtransactions = (props) => {
  if (props.showDetail) {
    return (
      props.subtransactions.map((sub) => {
        return (
          <Subtransaction key={sub.id}  showDetail={props.showDetail} {...sub} />
        )
      })
    )
  } else {
    return null
  }
}

export default Subtransactions
