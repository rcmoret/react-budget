import React, { Component } from 'react'
import MonthlyItemContainer from "./MonthlyItemContainer"

class MonthlyItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.updateParent = this.updateParent.bind(this)
  }

  updateParent(newState) {
    this.setState(newState)
  }

  render() {
    return (
      <MonthlyItemContainer {...this.state} updateParent={this.updateParent} />
    );
  }
}

export default MonthlyItem;
