import React from "react"
import Icon from "./Icon"

export default ({ class_name, name }) => (
  <div className="icon">
    <div className="icon-name">
      <Icon className={class_name} />
      {" "}
      {name}
    </div>
    <div className="icon-actions">
      <Icon className="fas fa-edit" />
      {" "}
      <Icon className="fas fa-trash" />
    </div>
  </div>
)
