import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../Icons/Icon'

class SubtransactionsButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps)
  }

  render() {
    if (this.state.subtransactions.length === 0) {
      return (
        <div className="add-subtransactions">
          <Link to="#" onClick={this.state.addSubtransactions}>
            <Icon className="fas fa-plus-circle" />&nbsp;
            Add Subtransactions
          </Link>
        </div>
      )
    } else {
      return (
        <div className="add-subtransactions">
          <Link to="#" onClick={this.state.addSubtransaction}>
            <Icon className="fas fa-plus-circle" />&nbsp;
            Add Subtransaction
          </Link>
        </div>
      )
    }
  }
}

SubtransactionsButton.defaultProps = {
  subtransactions: [],
}

export default SubtransactionsButton;
