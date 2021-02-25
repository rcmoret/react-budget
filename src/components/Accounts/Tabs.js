import React from "react"
import Tab from "./Tab"

export default ({ collection, currentMonth, currentYear, dateParams, selectedAccountId }) => (
  <div>
    {collection.map(account =>
      <Tab
        key={account.id}
        {...account}
        currentMonth={currentMonth}
        currentYear={currentYear}
        dateParams={dateParams}
        selectedAccountId={selectedAccountId}
      />
    )}
  </div>
)
