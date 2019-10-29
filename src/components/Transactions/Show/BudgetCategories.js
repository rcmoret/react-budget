import React from "react"
import Icon from "../../Icons/Icon"

export default (props) => {
  const {
    description,
    details,
  } = props

  const items = details.filter(detail => detail.budgetCategory !== null)
  if (items.length === 0 || description === null) {
    return null
  } else {
    return (
      <div className="budget-categories">
        {items.map((item, index) =>
          <span key={index}>
            {index > 0 && "; "}
            <Icon className={item.iconClassName} />
            {" "}
            {item.budgetCategory}
          </span>
        )}
      </div>
    )
  }
}
