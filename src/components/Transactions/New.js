import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { addDetailToNew, created, resetNew, updateNew, updateNewDetail } from "../../actions/transactions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import MoneyFormatter from "../../functions/MoneyFormatter"
import { post } from "../../functions/ApiClient"

import Form from "./Form/Form"

const New = (props) => {
  const { budgetOptions, dispatch, selectedAccount, transaction } = props
  const { details } = transaction

  const addDetail = (e) => {
    e.preventDefault()
    const action = addDetailToNew()
    dispatch(action)
  }

  const handleKeyDown = () => null

  const resetForm = (e) => {
    e.preventDefault()
    const action = resetNew()
    dispatch(action)
  }

  const onChange = (payload) => {
    const action = updateNew(payload)
    dispatch(action)
  }

  const onDetailChange = (index, attributes) => {
    const action = updateNewDetail({ index: index, attributes: attributes })
    dispatch(action)
  }

  const onSubmit = () => {
    const details_attributes = details.map(detail => {
      let adjusted = Math.round((parseFloat(detail.amount) || 0) * 100)
      return { ...detail, amount: adjusted }
    })
    const description = transaction.description === "" ? null : transaction.description
    const url = ApiUrlBuilder(["accounts", selectedAccount.id, "transactions"])
    const body = JSON.stringify({
      ...transaction,
      description: description,
      details_attributes: details_attributes,
    })
    const onSuccess = (data) => {
      dispatch(created(data))
      dispatch(resetNew({ showForm: true }))
    }
    const onFailure = data => console.log({ body: body, data: data })
    post(url, body, onSuccess, onFailure)
  }

  return (
    <Form
      transaction={transaction}
      addDetail={addDetail}
      budgetOptions={budgetOptions}
      buttonText={props.buttonText}
      handleKeyDown={handleKeyDown}
      onChange={onChange}
      onDetailChange={onDetailChange}
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
  const discretionary = { label: titleize(copy.discretionary.title), value: null }
  const budgetOptions = [discretionary, ...itemOptions]

  return {
    buttonText: "Create Transaction",
    budgetOptions: budgetOptions,
    selectedAccount: selectedAccount,
    transaction: transaction,
  }
}
export default connect(mapStateToProps)(New)
