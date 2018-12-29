import React, { Component } from 'react'
import MonthlyItems from './MonthlyItems'
import WeeklyItems from './WeeklyItems'

class Budget extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    return(
      <div>
        <WeeklyItems />
        <MonthlyItems />
      </div>
    )
  }
}

export default Budget;
