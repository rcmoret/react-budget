import React from "react"
import { connect } from "react-redux"

import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { created, updateNew } from "../../actions/transfers"

import Select from "react-select"

const New = (props) => {
  const { currentPage, dispatch, fromOptions, fromValue, newTransfer, toOptions, toValue } = props
  const { amount, from_account_id, to_account_id  } = newTransfer

  const submit = (e) => {
    e.preventDefault()
    const body = {
      amount: (amount * 100),
      to_account_id: to_account_id,
      from_account_id: from_account_id,
    }
    const url = ApiUrlBuilder(["transfers"])
    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => dispatch(created(data)))
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
          From Account:
          <Select
            options={fromOptions}
            onChange={updateFromAccount}
            value={fromValue}
          />
        </div>
        <div className="transfer-account-select">
          To Account:
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