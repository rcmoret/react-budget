import React from "react"
import WeeklyItem from "./WeeklyItem"

const WeeklyGroup = (props) => {
  const { collection, title } = props
  if (collection.length > 0) {
    return (
      <div className="budget-group">
        <h4>{title}</h4>
        {collection.map(item =>
          <WeeklyItem
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

export default WeeklyGroup
