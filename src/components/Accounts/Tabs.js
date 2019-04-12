import React from "react"
import Tab from "./Tab"

export default ({ collection, selectedAccountId }) => (
  <div>
    {collection.map(account =>
      <Tab
        key={account.id}
        {...account}
        selectedAccountId={selectedAccountId}
      />
    )}
  </div>
)
