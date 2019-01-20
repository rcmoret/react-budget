import React from 'react'
import AccountShow from "./AccountShow"
import NewAccount from "./NewAccount"

const IndexContainer = (props) => (
  <div className="accounts">
    <div className="account-show">
      {props.accounts.map((account) =>
        <AccountShow
          key={account.id}
          {...account}
          onUpdate={props.onUpdate}
        />
      )}
      <NewAccount {...props} onSave={props.onSave} />
    </div>
  </div>
)

export default IndexContainer
