import React, { Component } from 'react';
import MonthlyItem from './MonthlyItem';
import API_URL from '../../shared/Constants/Api'

class MonthlyItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentWillMount() {
    fetch(API_URL + '/budget/monthly_items')
      .then(response => response.json())
      .then(data => this.setState({
        items: data
      })
     )
  }

  render() {
    return(
      <div className="monthly-items">
        <h3>Monthly Items</h3>
        {this.state.items.map((item) =>
                              <MonthlyItem
                                key={item.id}
                                {...item}
                              />
                             )
        }
      </div>
    )
  }
}

export default MonthlyItems;
