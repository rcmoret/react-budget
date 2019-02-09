import React from "react"
import MonthlyItem from './MonthlyItem';

const MonthlyGroup = (props) => {
  const collection = props.collection.filter(item => item.deletable)
  if (collection.length > 0) {
    return (
      <div className="budget-group">
        <h4>{props.title}</h4>
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

export default MonthlyGroup
