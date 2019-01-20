import React from "react"
import MonthlyItem from './MonthlyItem';

const MonthlyGroup = (props) => {

  const { collection, title } = props
  if (collection.length > 0) {
    return (
      <div className="budget-group">
        <h4>{title}</h4>
          {collection.map((item) =>
            <MonthlyItem
              key={item.id}
              monthly={true}
              {...item}
            />
           )}
      </div>
    )
  } else {
    return null
  }
}

export default MonthlyGroup
