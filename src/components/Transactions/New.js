import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { addSubtransactionToNew, created, resetNew, updateNew, updateNewSubtransaction } from "../../actions/transactions"

import Form from "./Form/Form"

const New = (props) => {
  const { dispatch, selectedAccount, transaction } = props
  const { amount, subtransactions } = transaction

  const addSubtransaction = (e) => {
    e.preventDefault()
    const action = addSubtransactionToNew()
    dispatch(action)
  }

  const resetForm = (e) => {
    e.preventDefault()
    const action = resetNew()
    dispatch(action)
  }

  const onChange = (payload) => {
    const action = updateNew(payload)
    dispatch(action)
  }

  const onSubChange = (index, attributes) => {
    const action = updateNewSubtransaction({ index: index, attributes: attributes })
    dispatch(action)
  }

  const onSubmit = (e) => {
    const url = ApiUrlBuilder(["accounts", selectedAccount.id, "transactions"])
    const subtransactions_attributes = subtransactions.map(sub => {
      let adjusted = (parseFloat(sub.amount)) * 100 || null
      return { ...sub, amount: adjusted }
    })
    const adjustedAmount = (parseFloat(amount)) * 100 || null
    const postBody = {
      // accountId: selectedAccountId, this shouldn't be needed since it part of the url
      ...transaction,
      amount: adjustedAmount,
      subtransactions_attributes: subtransactions_attributes,
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody)
    })
    .then(response => response.json())
    .then(data => {
      dispatch(created(data))
      dispatch(resetNew())
    })
  }

  return (
    <Form
      transaction={transaction}
      addSubtransaction={addSubtransaction}
      onChange={onChange}
      onSubChange={onSubChange}
      onSubmit={onSubmit}
      resetForm={resetForm}
      selectedAccount={selectedAccount}
    />
  )
}

const mapStateToProps = (state) => {
  const transaction = state.transactions.new
  const selectedAccountId = parseInt(state.transactions.metadata.query_options.account_id)
  const selectedAccount = state.accounts.collection.find(account => account.id === selectedAccountId)

  return {
    transaction: transaction,
    selectedAccount: selectedAccount,
  }
}
export default connect(mapStateToProps)(New)
