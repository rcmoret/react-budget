import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../locales/copy"
import objectify from "../../models/transaction"
import { titleize } from "../../locales/functions"

import {
  addDetailToNew,
  created,
  editNewFormOptions,
  resetNew,
  removeNewDetail,
  toggleNewForm,
  updateNew,
  updateNewDetail,
} from "../../actions/transactions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import EventMessageBuilder from "../../functions/EventMessageBuilder"
import FindOrDefault from "../../functions/FindOrDefault"
import MoneyFormatter from "../../functions/MoneyFormatter"
import { post } from "../../functions/ApiClient"

import Form from "./Form/Form"

const New = (props) => {
  const { budgetOptions, dispatch, selectedAccount, showBudgetExclusion, showCheck, showNotes } = props
  const formOptions = { showBudgetExclusion: showBudgetExclusion, showCheck: showCheck, showNotes: showNotes }
  const transaction = objectify(props.transaction, formOptions)
  const { details } = transaction

  const addDetail = (e) => {
    e.preventDefault()
    const action = addDetailToNew()
    dispatch(action)
  }

  const removeDetail = (index) => {
    const action = removeNewDetail({ index: index })
    dispatch(action)
  }

  const handleKeyDown = () => null

  const resetForm = () => {
    const action = resetNew({ selectedAccount: selectedAccount })
    dispatch(action)
    closeForm()
  }

  const toggleFormOption = e => {
    const { name } = e.target
    const action = editNewFormOptions({ [name]: !transaction.formOptions[name] })
    dispatch(action)
  }

  const closeForm = () => dispatch(toggleNewForm())

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
    const url = ApiUrlBuilder({ route: "transactions-index", accountId: selectedAccount.id })
    const body = JSON.stringify({
      ...transaction,
      description: description,
      details_attributes: details_attributes,
    })
    const event = EventMessageBuilder({
      eventType: "transaction-entry-create",
      accountName: selectedAccount.name,
    })
    const onSuccess = (data) => {
      dispatch(created(data))
      dispatch(resetNew({ showForm: true, selectedAccount: selectedAccount }))
    }
    post(url, body, { event: event, onSuccess: onSuccess })
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
      removeDetail={removeDetail}
      resetForm={resetForm}
      selectedAccount={selectedAccount}
      toggleFormOption={toggleFormOption}
    />
  )
}

const mapStateToProps = (state) => {
  const transaction = state.transactions.new
  const selectedAccountId = parseInt(state.transactions.metadata.query_options.account_id)
  const selectedAccount = FindOrDefault(state.accounts.collection, (account => account.id === selectedAccountId), { cash_flow: true })
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
  const { showCheck, showNotes } = transaction.formOptions

  return {
    buttonText: "Create Transaction",
    budgetOptions: budgetOptions,
    selectedAccount: selectedAccount,
    showCheck: showCheck,
    showBudgetExclusion: !selectedAccount.cashFlow,
    showNotes: showNotes,
    transaction: transaction,
  }
}
export default connect(mapStateToProps)(New)
