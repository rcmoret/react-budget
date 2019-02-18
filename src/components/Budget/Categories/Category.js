import React from "react"
import { Link } from "react-router-dom"
import MoneyFormatter from "../../../shared/Functions/MoneyFormatter"
import Icon from "../../Icons/Icon"

export default ({ default_amount, expense, icon_class_name, monthly, name }) => (
  <div className="budget-category">
    <div className="category-name">{name}</div>
    <div className="category-default-amount">
      {MoneyFormatter(default_amount, { absoulte: false })}
    </div>
    <div className="category-detail">
      {monthly ? "monthly" : "weekly"}
      {" "}
      {expense ? "expense" : "revenue"}
    </div>
    <div className="category-icon">
      <Icon className={icon_class_name} />
    </div>
    <div className="category-edit">
      <Link to="#" className="far fa-edit"/>
    </div>
  </div>
)
