import React from "react"
import Icon from "../../Icons/Icon"

export default ({ budgetCategory, description, iconClassName }) => {
  if (description === null) {
    return (
      <div className="description">
        {budgetCategory} <Icon className={iconClassName} />
      </div>
    )
  } else {
    return (
      <div className="description">
        {description || ""}
      </div>
    )
  }
}
