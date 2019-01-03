import React, { Component } from 'react';
import Icon from '../Icons/Icon'

const Category = (props) => {
  if (props.icon_class_name) {
    return (
      <div>
        {props.index > 0 && ', '}
        <Icon className={props.icon_class_name} />&nbsp;
        {props.budget_category}
      </div>
    )
  } else {
    return (
      <div>
        {props.index > 0 && ', '}
        {props.budget_category}
      </div>
    )
  }
}

class BudgetCategories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subtransactions: [],
      ...props,
    }
    this.categories = this.categories.bind(this)
  }

  categories() {
    if (this.state.subtransactions.length > 0) {
      return this.state.subtransactions
    } else if (this.state.budget_category) {
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
    console.log(this.categories())
    if (this.categories().length > 0) {
      return (
        <div className="budget-categories">
          [
            {this.categories().map((category, i) =>
              <Category key={i} index={i} {...category} />
          )}
          ]
        </div>
      )
    } else {
      return null
    }
  }
}

export default BudgetCategories;
