import React from "react"
import { connect } from "react-redux"

import { fetched } from "./actions"
import { get } from "../../functions/ApiClient"
import ApiUrlBuilder from "../../functions/ApiUrlBuilder"

import New from "./New"
import Show from "./Show"

const Index = ({ apiKey, collection, dispatch, accountsFetched }) => {
  if (!accountsFetched) {
    const url = ApiUrlBuilder(["accounts"], { key: apiKey })
    const onSuccess = data => dispatch(fetched(data))
    const onFailure = data => console.log(data)
    get(url, onSuccess, onFailure)
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
  const { apiKey } = state.apiKey

  return {
    accountsFetched: accountsFetched,
    apiKey: apiKey,
    collection: accounts,
  }
}

export default connect(mapStateToProps)(Index)
