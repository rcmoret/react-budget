import React from "react";
import Icon from "../../Icons/Icon"

const BudgetCategories = (props) => {
  const budgetItems = () => {
    if (props.subtransactions.length > 0) {
      return props.subtransactions.filter((sub) => sub.budget_category !== null)
    } else if (props.description !== null && props.budget_category) {
      return [
        {
          budget_category: props.budget_category,
          icon_class_name: props.icon_class_name,
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
              {index > 0 && ', '}
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

export default BudgetCategories
