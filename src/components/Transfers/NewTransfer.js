import React from "react"
import { connect } from "react-redux"

import { account as accountCopy, transfer as copy } from "../../locales/copy"
import { titleize } from "../../locales/functions"

import { created, updateNew } from "./actions"

import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import EventMessageBuilder from "../../functions/EventMessageBuilder"
import { post } from "../../functions/ApiClient"

import Select from "react-select"

const New = (props) => {
  const { currentPage, dispatch, fromOptions, fromValue, newTransfer, toOptions, toValue } = props
  const { amount, from_account_id, to_account_id  } = newTransfer

  const submit = () => {
    const url = ApiUrlBuilder({ route: "transfers-index" })
    const body = JSON.stringify({
      amount: Math.round(amount * 100),
      to_account_id: to_account_id,
      from_account_id: from_account_id,
    })
    const onSuccess = data => dispatch(created(data))
    post(url, body, { onSuccess: onSuccess })
  }

  const updateAmount = (e) => {
    const action = updateNew({ amount: e.target.value })
    dispatch(action)
  }

  const updateToAccount = (e) => {
    const action = updateNew({ to_account_id: e.value })
    dispatch(action)
  }

  const updateFromAccount = (e) => {
    const action = updateNew({ from_account_id: e.value })
    dispatch(action)
  }

  if (currentPage === 1) {
    return (
      <div className="new-transfer-form">
        <div className="transfer-account-select">
          {titleize(`${copy.from} ${accountCopy.account}`)}:
          <Select
            options={fromOptions}
            onChange={updateFromAccount}
            value={fromValue}
          />
        </div>
        <div className="transfer-account-select">
          {titleize(`${copy.to} ${accountCopy.account}`)}:
          <Select
            options={toOptions}
            onChange={updateToAccount}
            value={toValue}
          />
        </div>
        <input
          value={amount}
          onChange={updateAmount}
          placeholder="amount"
        />
        <button
          type="submit"
          onClick={submit}
        >
          Submit
        </button>
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  const { newTransfer } = state.transfers
  const { from_account_id, to_account_id } = newTransfer

  const accounts = state.accounts.collection
  const nullOption = { value: null, label: "" }
  const fromOptions = accounts.filter(account => account.id !== to_account_id)
    .map(account => (
      { value: account.id, label: account.name }
    ))
  const toOptions = accounts.filter(account => account.id !== from_account_id)
    .map(account => (
      { value: account.id, label: account.name }
    ))
  const options = {
    from: [nullOption, ...fromOptions],
    to: [nullOption, ...toOptions]
  }
  const fromValue = options.from.find(opt => opt.value === from_account_id)
  const toValue = options.from.find(opt => opt.value === to_account_id)

  return {
    newTransfer: newTransfer,
    fromOptions: options.from,
    fromValue: fromValue,
    toOptions: options.to,
    toValue: toValue,
    currentPage: state.transfers.metadata.currentPage,
  }
}

export default connect(mapStateToProps)(New)
