import React, { Component } from "react";
import Icon from "../Icons/Icon"

class BudgetCategories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
    }
    this.budgetItems = this.budgetItems.bind(this)
  }

  budgetItems() {
    if (this.state.subtransactions.length > 0) {
      return this.state.subtransactions.filter((sub) => sub.budget_category !== null)
    } else if (this.state.description !== null && this.state.budget_category) {
      return [
        {
          budget_category: this.state.budget_category,
          icon_class_name: this.state.icon_class_name,
        }
      ]
    } else {
      return []
    }
  }

  render() {
    const collection = this.budgetItems()
    if (collection.length > 0) {
      return (
        <div className="budget-categories">
          [
            {collection.map((item, index) =>
              <div key={index}>
                {index > 0 && ', '}
                {item.budget_category}&nbsp;
                <Icon className={item.icon_class_name} />
              </div>
          )}
          ]
        </div>
      )
    } else {
      return null
    }
  }
}

BudgetCategories.defaultProps = {
  subtransactions: [],
}

export default BudgetCategories;
