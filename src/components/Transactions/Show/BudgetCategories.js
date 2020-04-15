import React from "react"
import Icon from "../../Icons/Icon"

export default (props) => {
  const {
    description,
    details,
    showDetail,
  } = props

  const budgetItems = details.filter(detail => detail.budget_item_id !== null)
  const emptyDescription = (description === "" || description === null)

  if (budgetItems.length > 0 && !emptyDescription && !showDetail) {
    return (
      <div className="budget-categories">
        {budgetItems.map((item, index) =>
          <span key={index}>
            {index > 0 && "; "}
            <Icon className={item.icon_class_name} />
            {" "}
            {item.budget_category}
          </span>
        )}
      </div>
    )
  } else {
    return null
  }
}
