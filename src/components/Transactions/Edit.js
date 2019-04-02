import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { edit, editProps, updated } from "../../actions/transactions"

import Form from "./Form/Form"

const Edit = (props) => {
  const { dispatch, transaction } = props
  const { account_id, amount, id } = transaction
  // const addSubtransaction = (e) => {
  // }

  const resetForm = (e) => {
    e.preventDefault()
    const action = edit({ id: id, showForm: false })
    dispatch(action)
  }

  const onChange = (payload) => {
    const action = editProps({ id: id, ...payload })
    dispatch(action)
  }

  const onSubmit = () => {
    const url = ApiUrlBuilder(["accounts", account_id, "transactions", id])
    const adjustedAmount = (parseFloat(amount)) * 100 || null
    const description = transaction.description === "" ? null : transaction.description
    const body = {
      ...transaction,
      description: description,
      amount: adjustedAmount,
    }
    fetch(url, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        dispatch(updated({ ...data, showForm: false }))
      })
  }

  if (transaction.showForm) {
    return (
      <Form
        onChange={onChange}
        onSubmit={onSubmit}
        resetForm={resetForm}
        { ...props }
      />
    )
  } else {
    return null
  }
}

const mapStateToProps = (state, ownProps) => {
  const updatedProps = {
    amount: parseFloat(ownProps.amount / 100.0).toFixed(2),
    ...ownProps.updatedProps
  }

  return {
    transaction: {
      ...ownProps,
      ...updatedProps,
    },
    selectedAccount: state.accounts.collection.find(acct => acct.id === ownProps.account_id),
    buttonText: "Update Transaction",
  }
}

export default connect(mapStateToProps)(Edit)
