import React from "react"
import Icon from "../../Icons/Icon"

export default (props) => {
  const {
    description,
    details,
  } = props

  if (description === null) {
    return (
      <div className="description">
        {details.map((detail, index) =>
          <span key={index}>
            {index > 0 && ", "}
            <Item
              key={index}
              detail={detail}
            />
            {" "}
          </span>
        )}
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

// {budgetCategory} <Icon className={iconClassName} />

const Item = ({ detail }) => {
  const { budgetCategory, iconClassName } = detail

  if (budgetCategory === null) {
    return (
      <span>
        Discretionary
      </span>
    )
  } else if (iconClassName === null) {
    return (
      <span>
        {budgetCategory}
      </span>
    )
  } else {
    return (
      <span>
        {budgetCategory} <Icon className={iconClassName} />
      </span>
    )
  }
}
