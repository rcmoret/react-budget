import React, { Component } from 'react';
import Discretionary from './Discretionary'
import WeeklyItem from './WeeklyItem';

class WeeklyItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentWillMount() {
    fetch('http://192.168.1.81:8088/budget/weekly_items')
      .then(response => response.json())
      .then(data => this.setState({
        items: data
      })
     )
  }

  render() {
    return(
      <div className="weekly-items">
        <h3>Weekly Items</h3>
        <Discretionary />
        {this.state.items.map((item) =>
                              <WeeklyItem
                                key={item.id}
                                {...item}
                              />
                             )
        }
      </div>
    )
  }
}

export default WeeklyItems;
