import React from "react"
import { connect } from "react-redux"

import { fetched } from "./actions"
import { get } from "../../functions/ApiClient"
import ApiUrlBuilder from "../../functions/ApiUrlBuilder"

import New from "./New"
import Show from "./Show"

const Index = ({ apiErrorPresent, apiKey, collection, dispatch, accountsFetched }) => {
  if (apiErrorPresent) {
    return null
  }

  if (!accountsFetched) {
    const url = ApiUrlBuilder({ route: "accounts-index" })
    const onSuccess = data => dispatch(fetched(data))
    get(url, onSuccess)
  }

  return (
    <div className="accounts">
      <div className="account-show">
        {collection.map(account =>
          <Show
            key={account.id}
            {...account}
          />
        )}
        <New />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { collection, accountsFetched } = state.accounts
  const accounts = collection.sort((a, b) => a.priority - b.priority)
  const apiErrorPresent = state.messages.errors.api.length > 0

  return {
    accountsFetched: accountsFetched,
    apiErrorPresent: apiErrorPresent,
    collection: accounts,
  }
}

export default connect(mapStateToProps)(Index)
