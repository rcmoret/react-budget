import React from "react"

import Icon from "../../Icons/Icon"

export const BudgetCategoryIcons = ({ details }) => {
  const budgetItems = details.filter(detail => detail.budget_item_id !== null)

  if (budgetItems.length === 0) {
    return null
  } else {
    return (
      <div className="info-item">
        {budgetItems.map((item, index) => (
          <span key={index}>
            {index > 0 && <SpaceSpan />}
            <Icon className={item.icon_class_name} />
            {" "}
          </span>
        ))}
      </div>
    )
  }
}

export const CheckIcon = ({ checkNumber }) => {
  const emptyCheckNumber = checkNumber === "" || checkNumber === null

  if (emptyCheckNumber) {
    return null
  } else {
    return(
      <div className="info-item">
        <Icon className="fas fa-money-check" />
      </div>
    )
  }
}

export const NotesIcon = ({ notes }) => {
  const emptyNote = notes === "" || notes === null

  if (emptyNote) {
    return null
  } else {
    return(
      <div className="info-item">
        <Icon className="fas fa-sticky-note" />
      </div>
    )
  }
}

const SpaceSpan = () => <span className="spacer"></span>
