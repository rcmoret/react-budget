import React from "react"
import Icon from "./Icon"

export default ({ class_name, name }) => (
  <div className="budget-category">
    <Icon className={class_name} />
    {" "}
    {name}
  </div>
)
