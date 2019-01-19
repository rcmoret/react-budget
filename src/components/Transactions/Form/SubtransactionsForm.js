import React, { Component } from 'react'
import SubtransactionForm from './SubtransactionForm'

class SubtransactionsForm extends Component {
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
      return null
    } else {
      return (
        <div className="transaction-form-row">
          <div className="subtransaction-form">
            {this.state.subtransactions.map((sub, i) =>
              <SubtransactionForm
               key={i}
               _id={sub.id || i}
               {...sub}
               removeSubtransaction={this.state.removeSubtransaction}
               updateParent={this.state.updateParent}
              />
            )}
          </div>
        </div>
      )
    }
  }
}

SubtransactionsForm.defaultProps = {
  subtransactions: [],
}

export default SubtransactionsForm;
