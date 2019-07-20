import React from "react"

import ApiUrlBuilder from "../../../../functions/ApiUrlBuilder"
import {
  editMaturityInterval,
  toggleMaturityIntervalEditForm,
  updateMaturityInterval,
} from "../../../../actions/budget/categories"

import Form from "./Form"

export default (props) => {
  const {
    id,
    category_id,
    dispatch,
    month,
    updatedProps,
    year,
  } = props

  const maturityInterval = {
    id: id,
    month: month,
    year: year,
    ...updatedProps,
  }

  const options = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ]
  const value = options.find(option => option.value === maturityInterval.month)

  const onChange = (payload) => {
    const action = editMaturityInterval({ id: id, ...payload })
    dispatch(action)
  }

  const closeForm = () => {
    const action = toggleMaturityIntervalEditForm({
      id: id,
      showForm: false,
    })
    dispatch(action)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const url = ApiUrlBuilder(["budget/categories", category_id, "maturity_intervals", id])
    fetch(url, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(maturityInterval)
    })
      .then(response => response.json())
      .then(data => dispatch(updateMaturityInterval(data)))
      .then(() => closeForm())
  }

  return (
    <Form
      cancel={closeForm}
      maturityInterval={maturityInterval}
      onChange={onChange}
      onSubmit={onSubmit}
      options={options}
      value={value}
    />
  )
}
