import React from "react"

import GroupHeader from "./GroupHeader"
import MonthlyItem from "./MonthlyItem"

export default ({ collection, title }) => {
  if (collection.length > 0) {
    return (
      <div className="budget-group">
        <GroupHeader title={title} />
        {collection.map(item =>
          <MonthlyItem
            key={item.id}
            {...item}
          />
        )}
      </div>
    )
  } else {
    return null
  }
}
