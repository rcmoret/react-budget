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

  const onClick = showDetail ? collapseDetail : expandDetail
  const budgetDetails = details.filter(detail => detail.budget_item_id !== null)

  return (
    <div className="description">
      <div className="plain-text">
        <Description budgetDetails={budgetDetails} description={description} onClick={onClick} />
      </div>
      <div className="link">
        <Link to="#" onClick={onClick}>
          <Description budgetDetails={budgetDetails} description={description} />
        </Link>
      </div>
      <BudgetItemDetails description={description} details={details} showDetail={showDetail} />
    </div>
  )
}

const Description = ({ budgetDetails, description }) => {
  const emptyDescription = description === null || description === ""

  if (emptyDescription) {
    return (
      <DetailsMap budgetDetails={budgetDetails} />
    )
  } else {
    return (
      <span>{description}</span>
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

const BudgetItemDetails = ({ description, details, showDetail }) => {
  const displayableDetails = details.length > 1 || description !== null

  if (showDetail && displayableDetails) {
    return (
      <div className="description-details">
        {details.map(detail => (
          <div className="description-detail" key={detail.id}>
            {detail.budget_category} <Icon className={detail.icon_class_name} />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}
