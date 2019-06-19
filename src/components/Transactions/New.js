import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { addSubtransactionToNew, created, resetNew, updateNew, updateNewSubtransaction } from "../../actions/transactions"
import MoneyFormatter from "../../shared/Functions/MoneyFormatter"

import Form from "./Form/Form"

const New = (props) => {
  const { budgetOptions, dispatch, selectedAccount, transaction } = props
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

  const onSubmit = () => {
    const url = ApiUrlBuilder(["accounts", selectedAccount.id, "transactions"])
    const subtransactions_attributes = subtransactions.map(sub => {
      let adjusted = (parseFloat(sub.amount) || 0) * 100
      return { ...sub, amount: adjusted }
    })
    const adjustedAmount = (parseFloat(amount) || 0) * 100
    const description = transaction.description === "" ? null : transaction.description
    const postBody = {
      ...transaction,
      description: description,
      amount: adjustedAmount,
      subtransactions_attributes: subtransactions_attributes,
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
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
      budgetOptions={budgetOptions}
      buttonText={props.buttonText}
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
  const items = state.transactions.budgetItems.collection
  const collection = items.filter(item => !item.monthly || item.deletable)
  const labelFor = (item) => `${item.name} (${MoneyFormatter(item.remaining, { absolute: true })})`
  const optionFor = (item) => ({
    value: item.id,
    label: labelFor(item),
    monthly: item.monthly,
    amount: parseFloat(item.amount / 100.0).toFixed(2),
  })
  const sortFn = (a, b) => a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1
  const filterFn = (item) => !item.accrual || item.matureAccrual
  const itemOptions = collection
    .filter(filterFn)
    .map(optionFor)
    .sort(sortFn)
  const discretionary = { label: "Discretionary", value: null }
  const budgetOptions = [discretionary, ...itemOptions]

  return {
    buttonText: "Create Transaction",
    budgetOptions: budgetOptions,
    selectedAccount: selectedAccount,
    transaction: transaction,
  }
}
export default connect(mapStateToProps)(New)
