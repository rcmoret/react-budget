import React from "react"

import GroupHeader from "./GroupHeader"
import WeeklyItem from "./WeeklyItem"

const WeeklyGroup = (props) => {
  const { collection, daysRemaining, title, totalDays } = props
  if (collection.length > 0) {
    return (
      <div className="budget-group">
        <GroupHeader title={title} />
        {collection.map(item =>
          <WeeklyItem
            key={item.id}
            {...item}
            daysRemaining={daysRemaining}
            totalDays={totalDays}
          />
        )}
      </div>
    )
  } else {
    return null
  }
}

export default WeeklyGroup
