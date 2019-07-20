import React from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { fetched } from "./actions"
import New from "./New"
import Show from "./Show"

const Index = ({ collection, dispatch, accountsFetched }) => {
  if (!accountsFetched) {
    fetch(ApiUrlBuilder(["accounts"]))
      .then(response => response.json())
      .then(data => dispatch(fetched(data)))
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
  const accounts = collection.sort((a, b) => {
    return a.priority - b.priority
  })

  return {
    collection: accounts,
    accountsFetched: accountsFetched,
  }
}

export default connect(mapStateToProps)(Index)
