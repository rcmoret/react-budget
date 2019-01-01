import React, { Component } from 'react'
import API_URL from '../../shared/Constants/Api'

class Discretionary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'spending cache',
      remaining: 0,
    }
  }

  componentWillMount() {
    fetch(API_URL + '/budget/discretionary')
      .then(response => response.json())
      .then(data => this.setState({
        ...data
        })
     )
  }

  render() {
    return(
      <div>
        <strong>{this.state.name}</strong>
        <p>${parseFloat(this.state.remaining / 100.0).toFixed(2)}</p>
      </div>
    )
  }
}

export default Discretionary;
