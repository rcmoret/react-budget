import React from "react"
import MonthlyItem from "./MonthlyItem";

export default ({ collection, title }) => {
  if (collection.length > 0) {
    return (
      <div className="budget-group">
        <h4>{title}</h4>
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
