import React from "react"
import { connect } from "react-redux"

import { budget as budgetCopy, transaction as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { addDetailToEntry, edit, editDetailProps, editProps, updated } from "../../actions/transactions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import MoneyFormatter from "../../functions/MoneyFormatter"
import { put } from "../../functions/RestApiClient"

import Form from "./Form/Form"

const Edit = (props) => {
  const { budgetOptions, dispatch, transaction } = props
  const { id, account_id, details } = transaction

  const handleKeyDown = (e) => {
    if (e.which !== 13) {
      return
    }
    onSubmit()
  }

  const resetForm = (e) => {
    e.preventDefault()
    const action = edit({ id: id, showForm: false })
    dispatch(action)
  }

  const onChange = (payload) => {
    const action = editProps({ id: id, ...payload })
    dispatch(action)
  }

  const onDetailChange = (detailId, payload) => {
    const action = editDetailProps({ txnId: id, detailId: detailId, ...payload })
    dispatch(action)
  }

  const addDetail = () => {
    const action = addDetailToEntry({ id: id, detailId: details.length })
    dispatch(action)
  }

  const onSubmit = () => {
    const description = transaction.description === "" ? null : transaction.description
    const url = ApiUrlBuilder(["accounts", account_id, "transactions", id])
    const body = JSON.stringify({
      ...transaction,
      description: description,
      details_attributes: transaction.details.map(detail => (
        {
          ...detail,
          ...detail.updatedProps,
          amount: Math.round(parseFloat(detail.updatedProps.amount) * 100),
        }
      ))
    })
    const onSuccess = (data) => dispatch(updated({
      ...data,
      showForm: false,
      originalAmount: transaction.originalAmount
    }))
    put(url, body, onSuccess)
  }

  if (transaction.showForm) {
    return (
      <Form
        addDetail={addDetail}
        budgetOptions={budgetOptions}
        buttonText={titleize(copy.updateButtonText)}
        handleKeyDown={handleKeyDown}
        onChange={onChange}
        onDetailChange={onDetailChange}
        onSubmit={onSubmit}
        resetForm={resetForm}
        {...props}
      />
    )
  } else {
    return null
  }
}

const mapStateToProps = (state, ownProps) => {
  const updatedProps = {
    amount: parseFloat(ownProps.amount / 100.0).toFixed(2),
    ...ownProps.updatedProps,
  }

  const details = ownProps.details.map(detail => {
    return {
      ...detail,
      amount: parseFloat(detail.amount / 100.0).toFixed(2),
      ...detail.updatedProps,
      updatedProps: {
        amount: parseFloat(detail.amount / 100.0).toFixed(2),
        ...detail.updatedProps,
      }
    }
  })

  const items = state.transactions.budgetItems.collection
  const collection = items.filter(item => !item.monthly || item.deletable || item.id === ownProps.budget_item_id)
  const labelFor = (item) => `${item.name} (${MoneyFormatter(item.remaining, { absolute: true })})`
  const optionFor = (item) => ({ value: item.id, label: labelFor(item) })
  const sortFn = (a, b) => a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1
  const filterFn = (item) => !item.accrual || item.matureAccrual
  const itemOptions = collection
    .filter(filterFn)
    .map(optionFor)
    .sort(sortFn)
  const discretionary = { label: titleize(budgetCopy.discretionary.title), value: null }
  const budgetOptions = [discretionary, ...itemOptions]

  return {
    transaction: {
      ...ownProps,
      ...updatedProps,
      details: details,
      originalAmount: ownProps.amount,
    },
    budgetOptions: budgetOptions,
    selectedAccount: state.accounts.collection.find(acct => acct.id === ownProps.account_id),
  }
}

export default connect(mapStateToProps)(Edit)
