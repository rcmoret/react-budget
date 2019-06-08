import React from "react"

import { Redirect } from "react-router"

export default () => {
  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  return (
    <Redirect to={`/budget/${month}/${year}`} />
  )
}
