import React from "react"
import { connect } from "react-redux"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import { fetched as acctFetched } from "../../Accounts/actions"
import { markIntervalClosed, updateSelectedFromAccountId, updateSelectedToAccountId } from "../actions/finalize"

import ApiUrlBuilder from "../../../functions/ApiUrlBuilder"
import { get, put } from "../../../functions/ApiClient"
import EventMessageBuilder from "../../../functions/EventMessageBuilder"
import MoneyFormatter from "../../../functions/MoneyFormatter"

import Submit from "./Submit"
import Summary from "./Summary"
import Header from "./Header"
import { Redirect } from "react-router-dom"
import Select from "react-select"

const Finish = (props) => {
  const {
    accountsFetched,
    isApiUnauthorized,
    apiKey,
    baseMonthFetched,
    baseMonthFinalized,
    dispatch,
    extra,
    fromOptions,
    fromValue,
    month,
    nextMonth,
    nextYear,
    note,
    selectedFromAccountId,
    selectedToAccountId,
    toOptions,
    totalExtra,
    toValue,
    year,
  } = props

  if (!baseMonthFetched) {
    return (
      <Redirect to={`/budget/finalize/${month}/${year}/start`} />
    )
  } else if (baseMonthFinalized) {
    return (
      <Redirect to={`/budget/${nextMonth}/${nextYear}`} />
    )
  } else if (totalExtra >= 0) {
    const url = ApiUrlBuilder({ route: "interval-show", month: month, year: year })
    const body = { close_out_completed_at: new Date() }
    const event = EventMessageBuilder({
      eventType: "interval-mark-complete",
      month: month,
      year: year,
      closeOutCompletedAt: body.close_out_completed_at,
    })
    const onSuccess = () => dispatch(markIntervalClosed)
    put(url, JSON.stringify(body), { event: event, onSuccess: onSuccess  })
    return null
  } else if (!isApiUnauthorized && !accountsFetched) {
    const url = ApiUrlBuilder({ route: "accounts-index" })
    const onSuccess = data => dispatch(acctFetched(data))
    get(url, onSuccess)
    return null
  } else {
    return (
      <div>
        <Header
          month={month}
          year={year}
        />
        <div className="finalize-wrapper">
          <div className="finalize-workspace">
            <h4>{titleize(copy.finalize.depositExtra)}</h4>
            <div className="finalize-extra">
              <div className="title">
                {titleize(`${copy.shared.total} ${copy.finalize.extra} ${MoneyFormatter(totalExtra, { absolute: true })}`)}
              </div>
              <AccountSelect
                actionFn={updateSelectedFromAccountId}
                dispatch={dispatch}
                options={fromOptions}
                title={copy.finalize.selectFromAccount}
                value={fromValue}
              />
              <AccountSelect
                actionFn={updateSelectedToAccountId}
                dispatch={dispatch}
                options={toOptions}
                title={copy.finalize.selectToAccount}
                value={toValue}
              />
              <div className="extra-submit">
                <Submit
                  apiKey={apiKey}
                  dispatch={dispatch}
                  month={month}
                  note={note}
                  selectedFromAccountId={selectedFromAccountId}
                  selectedToAccountId={selectedToAccountId}
                  totalExtra={totalExtra}
                  year={year}
                />
              </div>
            </div>
          </div>
          <Summary extra={extra} />
        </div>
      </div>
    )
  }
}

const AccountSelect = ({ actionFn, dispatch, options, value, title }) => {
  const handleChange = (e) => {
    const action = actionFn({ id: e.value })
    dispatch(action)
  }

  return (
    <div className="account-select">
      {title}
      <Select
        isSearchable={false}
        onChange={handleChange}
        options={options}
        value={value}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const baseMonth = parseInt(ownProps.match.params.month)
  const baseYear = parseInt(ownProps.match.params.year)
  const { accounts, budget } = state
  const { finalize } = budget
  const baseMonthFetched = finalize.baseMonth.isFetched
  const { month, year } = finalize.baseMonth
  const nextMonth = (finalize.next.month || (baseMonth === 12 ? 1 : (baseMonth + 1)))
  const nextYear = (finalize.next.year || (baseMonth === 12 ? (baseYear + 1) : baseYear))
  const { extra, selectedFromAccountId, selectedToAccountId } = finalize
  const totalExtra = extra.reduce((sum, item) => sum + item.amount, 0)
  const fromOptions = accounts
    .collection
    .filter(a => a.cash_flow)
    .map(account => ({ label: account.name, value: account.id }))
  const fromValue = fromOptions.find(option => option.value === selectedFromAccountId)
  const toOptions = accounts
    .collection
    .filter(a => !a.cash_flow)
    .map(account => ({ label: account.name, value: account.id }))
  const toValue = toOptions.find(option => option.value === selectedToAccountId)
  const note = extra
    .filter(item => item.amount !== 0)
    .map(item => `${item.name} (${MoneyFormatter(item.amount, { absoulte: false })})`)
    .join("; ")
  const { apiKey } = state.apiKey

  return {
    accountsFetched: accounts.accountsFetched,
    apiKey: apiKey,
    baseMonthFetched: baseMonthFetched,
    baseMonthFinalized: finalize.baseMonth.is_closed_out,
    extra: extra,
    fromOptions: fromOptions,
    fromValue: fromValue,
    month: (month || baseMonth),
    nextMonth: nextMonth,
    nextYear: nextYear,
    note: note,
    selectedFromAccountId: selectedFromAccountId,
    selectedToAccountId: selectedToAccountId,
    toOptions: toOptions,
    totalExtra: totalExtra,
    toValue: toValue,
    year: (year || baseYear),
  }
}

export default connect(mapStateToProps)(Finish)
