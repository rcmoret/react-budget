import React from "react"
import { connect } from "react-redux"

import { fetched } from "./actions"
import { getAccounts } from "./graphqlQueries"

import New from "./New"
import Show from "./Show"

const Index = ({ collection, dispatch, accountsFetched }) => {
  if (!accountsFetched) {
    const action = (accounts) => dispatch(fetched(accounts))
    getAccounts(result => action(result.data.accounts))
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

  return {
    collection: accounts,
    accountsFetched: accountsFetched,
  }
}

export default connect(mapStateToProps)(Index)
