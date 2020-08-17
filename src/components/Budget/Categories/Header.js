import React from "react"

import { budget as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

export default () => (
  <div className="budget-category" id="budget-category-header">
    <div className="category-name"><h3>{titleize(copy.category.name)}</h3></div>
    <div className="category-slug italic"><h3>Slug</h3></div>
    <div className="category-default-amount"><h3>{titleize(copy.category.defaultAmount)}</h3></div>
    <div className="category-detail"><h3>{titleize(copy.category.details)}</h3></div>
    <div className="category-accrual"><h3>{titleize(copy.category.accrual)}</h3></div>
    <div className="category-icon"><h3>{titleize(copy.category.icon)}</h3></div>
    <div className="category-option-buttons"><h3>{titleize(copy.category.editSlashDelete)}</h3></div>
    <div className="category-maturity-intervals"><h3>{titleize(copy.maturityInterval.title)}</h3></div>
  </div>
)
