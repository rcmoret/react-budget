import React from 'react'
import AccountShow from "./AccountShow"
import NewAccount from "./NewAccount"

const IndexContainer = (props) => (
  <div className="accounts">
    <div className="account-show">
      {props.collection.map((account) =>
        <AccountShow
          key={account.id}
          {...account}
        />
      )}
      <NewAccount {...props} />
    </div>
  </div>
)

export default IndexContainer
