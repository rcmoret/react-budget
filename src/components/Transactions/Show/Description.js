import React from "react"
import Icon from "../../Icons/Icon"

export default ({ description, details }) => {
  const budgetDetails = details.filter(detail => detail.budget_item_id !== null)

  if (description === null) {
    return (
      <div className="description">
        {budgetDetails.map((detail, index) => (
          <span key={detail.id}>
            {index > 0 && "; "}
            {detail.budget_category} <Icon className={detail.icon_class_name} />
            {" "}
          </span>
        ))}
      </div>
    )
  } else {
    return (
      <div className="description">
        {description}
      </div>
    )
  }
}
