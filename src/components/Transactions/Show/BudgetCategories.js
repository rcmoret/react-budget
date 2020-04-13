import React from "react"
import Icon from "../../Icons/Icon"

export default (props) => {
  const {
    check_number,
    description,
    details,
    notes,
    showDetail,
  } = props

  const budgetItems = details.filter(detail => detail.budget_item_id !== null)
  const emptyCheckNumber = (check_number === "" || check_number === null)
  const emptyDescription = (description === "" || description === null)
  const emptyNotes = (notes === "" || notes === null)

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
  } else if (showDetail &&  emptyCheckNumber && emptyNotes) {
    return (
      <div className="budget-categories">
        <Icon className="fas fa-list" />
      </div>
    )
  } else {
    return null
  }
}
