import React, { Component } from 'react';
import Discretionary from './Discretionary'
import WeeklyItem from './WeeklyItem';
import API_URL from '../../shared/Constants/Api'

class WeeklyItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentWillMount() {
    fetch(API_URL + '/budget/weekly_items')
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
