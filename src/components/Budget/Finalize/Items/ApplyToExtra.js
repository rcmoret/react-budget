import React from "react"

import { budget as copy } from "../../../../locales/copy"

import {
  setStatus,
  updateExtra,
} from "../../actions/finalize"

import Icon from "../../../Icons/Icon"

export default ({ amount, baseItem, dispatch }) => {
  const {
    id,
    name,
    remaining
  } = baseItem

  if (Math.round(amount * 100) !== remaining) {
    return null
  }

  const handleSubmit = () => {
    dispatch(updateExtra({
      id: id,
      name: name,
      amount: remaining,
    }))
    dispatch(setStatus({
      id: id,
      status: "reviewed"
    }))
  }

  return (
    <button
      className="apply-to-extra"
      onClick={handleSubmit}
    >
      {copy.finalize.applyToExtra}
      {" "}
      <Icon className="fas fa-donate" />
    </button>
  )
}

