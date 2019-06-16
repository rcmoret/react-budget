import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { edit, editProps, editSubProps, updated } from "../../actions/transactions"
import MoneyFormatter from "../../shared/Functions/MoneyFormatter"

import Form from "./Form/Form"

const Edit = (props) => {
  const { budgetOptions, dispatch, transaction } = props
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

  const onSubChange = (subId, payload) => {
    const action = editSubProps({ txnId: id, subId: subId, ...payload })
    dispatch(action)
  }

  const onSubmit = () => {
    const url = ApiUrlBuilder(["accounts", account_id, "transactions", id])
    const adjustedAmount = Math.round((parseFloat(amount) || 0) * 100)
    const description = transaction.description === "" ? null : transaction.description
    const body = {
      ...transaction,
      description: description,
      amount: adjustedAmount,
      subtransactions_attributes: transaction.subtransactions.map(sub => {
        return {
          ...sub,
          ...sub.updatedProps,
          amount: Math.round(parseFloat(sub.updatedProps.amount) * 100),
        }
      })
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
        dispatch(updated({ ...data, showForm: false, originalAmount: transaction.originalAmount }))
      })
  }

  if (transaction.showForm) {
    return (
      <Form
        budgetOptions={budgetOptions}
        onChange={onChange}
        onSubChange={onSubChange}
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
    ...ownProps.updatedProps,
  }

  const subtransactions = ownProps.subtransactions.map(sub => {
    return {
      ...sub,
      amount: parseFloat(sub.amount / 100.0).toFixed(2),
      ...sub.updatedProps,
      updatedProps: {
        amount: parseFloat(sub.amount / 100.0).toFixed(2),
        ...sub.updatedProps,
      }
    }
  })

  const items = state.transactions.budgetItems.collection
  const collection = items.filter(item => !item.monthly || item.deletable || item.id === ownProps.budget_item_id)
  const labelFor = (item) => {
    const remaining = item.monthly ? item.amount : item.remaining
    return `${item.name} (${MoneyFormatter(remaining, { absolute: true })})`
  }
  const optionFor = (item) => ({ value: item.id, label: labelFor(item) })
  const sortFn = (a, b) => a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1
  const filterFn = (item) => !item.accrual || item.matureAccrual
  const itemOptions = collection
    .filter(filterFn)
    .map(optionFor)
    .sort(sortFn)
  const discretionary = { label: "Discretionary", value: null }
  const budgetOptions = [discretionary, ...itemOptions]

  return {
    transaction: {
      ...ownProps,
      ...updatedProps,
      subtransactions: subtransactions,
      originalAmount: ownProps.amount,
    },
    buttonText: "Update Transaction",
    budgetOptions: budgetOptions,
    selectedAccount: state.accounts.collection.find(acct => acct.id === ownProps.account_id),
  }
}

export default connect(mapStateToProps)(Edit)
