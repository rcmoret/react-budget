import React from "react"
import { connect } from "react-redux"

import { budget as budgetCopy, transaction as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import {
  addDetailToEntry,
  editDetailProps,
  editFormOptions,
  editProps,
  removeDetail,
  toggleEditForm,
  updated,
} from "../../actions/transactions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import EventMessageBuilder, { changedProps } from "../../functions/EventMessageBuilder"
import MoneyFormatter from "../../functions/MoneyFormatter"
import { put } from "../../functions/ApiClient"

import Form from "./Form/Form"

const Edit = (props) => {
  const { budgetOptions, dispatch, transaction } = props
  const { id, account_id, clearance_date, details } = transaction

  const handleKeyDown = (e) => {
    if (e.which !== 13) {
      return
    }
    onSubmit()
  }

  const resetForm = (e) => {
    e.preventDefault()
    const action = toggleEditForm({ id: id })
    dispatch(action)
  }

  const detailDelete = (detailId, detail) => {
    const confirmation = window.confirm(copy.deleteDetailConfirmationMessage)
    const { amount, budget_item_id, budget_category } = detail

    if (confirmation) {
      const action = removeDetail({
        account_id: account_id,
        amount: (Math.round(amount * -100)),
        clearance_date: clearance_date,
        detailId: detailId,
        transactionId: id,
      })
      const url = ApiUrlBuilder({ route: "transaction-show", id: id, accountId: account_id })
      const body = JSON.stringify({
        details_attributes: [{ id: detailId, _destroy: true }]
      })
      const onSuccess = () => dispatch(action)
      const event = EventMessageBuilder({
        eventType: "transaction-detail-delete",
        id: detailId,
        entryId: id,
        amount: amount,
        budgetItemId: budget_item_id,
        budgetCategory: budget_category
      })
      put(url, body, { event: event, onSuccess: onSuccess })
    }
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

  const toggleFormOption = (e) => {
    const optionName = e.target.name
    const action = editFormOptions({ id: id, [optionName]: !transaction.formOptions[optionName] })
    dispatch(action)
  }

  const onSubmit = () => {
    const description = transaction.description === "" ? null : transaction.description
    const url = ApiUrlBuilder({ route: "transaction-show", id: id, accountId: account_id })
    const body = JSON.stringify({
      ...transaction,
      description: description,
      details_attributes: details.map(detail => (
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
    const event = EventMessageBuilder({
      eventType: "transaction-entry-update",
      id: id,
      changedProps: transaction.changedProps,
      details: details.map(detail => (
        {
          id: detail.id,
          changedProps: changedProps(
            {
              ...detail,
              ...detail.originalProps,
            },
            {
              ...detail.updatedProps,
              amount: Math.round(parseFloat(detail.updatedProps.amount) * 100),
            }
          ),
        }
      ))
    })
    put(url, body, { onSuccess: onSuccess, event: event })
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
        removeDetail={detailDelete}
        resetForm={resetForm}
        toggleFormOption={toggleFormOption}
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
      originalProps: detail,
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
      changedProps: changedProps(ownProps, { ...updatedProps, amount: Math.round(parseFloat(updatedProps.amount) * 100) }),
      details: details,
      originalAmount: ownProps.amount,
    },
    budgetOptions: budgetOptions,
    selectedAccount: state.accounts.collection.find(acct => acct.id === ownProps.account_id),
  }
}

export default connect(mapStateToProps)(Edit)
