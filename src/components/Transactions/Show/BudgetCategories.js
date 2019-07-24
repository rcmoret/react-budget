import React from "react"
import Icon from "../../Icons/Icon"

export default (props) => {
  const {
    budget_category,
    description,
    icon_class_name,
    subtransactions,
  } = props

  const budgetItems = () => {
    if (subtransactions.length > 0) {
      return subtransactions.filter((sub) => sub.budget_category !== null)
    } else if (description !== null && budget_category) {
      return [
        {
          budget_category: budget_category,
          icon_class_name: icon_class_name,
        }
      ]
    } else {
      return []
    }
  }

  const items = budgetItems()
  if (items.length > 0) {
    return (
      <div className="budget-categories">
        [
        {items.map((item, index) =>
          <span key={index}>
            {index > 0 && ", "}
            {item.budget_category}
            {" "}
            <Icon className={item.icon_class_name} />
          </span>
        )}
        ]
      </div>
    )
  } else {
    return null
  }
}
