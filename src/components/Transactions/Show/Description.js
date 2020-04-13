import React from "react"

import Icon from "../../Icons/Icon"
import { Link } from "react-router-dom"

export default (props) => {
  const {
    collapseDetail,
    description,
    details,
    expandDetail,
    showDetail,
  } = props

  const emptyDescription = description === null || description === ""
  const budgetDetails = details.filter(detail => detail.budget_item_id !== null)
  const onClick = showDetail ? collapseDetail : expandDetail

  if (emptyDescription) {
    return (
      <div className="description">
        <span className="plain-text">
          <DetailsMap budgetDetails={budgetDetails} />
        </span>
        <span className="link">
          <Link to="#" onClick={onClick}>
            <DetailsMap budgetDetails={budgetDetails} />
          </Link>
        </span>
      </div>
    )
  } else {
    return (
      <div className="description">
        <span className="plain-text">
          {description}
        </span>
        <span className="link">
          <Link to="#" onClick={onClick}>
            {description}
          </Link>
        </span>
      </div>
    )
  }

}

const DetailsMap = ({ budgetDetails }) => (
  <span>
    {budgetDetails.map((detail, index) => (
      <span className="budget-item" key={detail.id}>
        {index > 0 && "; "}
        {detail.budget_category} <Icon className={detail.icon_class_name} />
        {" "}
      </span>
    ))}
  </span>
)
