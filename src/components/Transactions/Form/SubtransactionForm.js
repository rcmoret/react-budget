import React, { Component } from 'react'
import BudgetItemSelect from './BudgetItemSelect'
import { Link } from 'react-router-dom'

class SubtransactionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.removeSubtransaction = this.removeSubtransaction.bind(this)
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState(nextProps)
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value },
      () => this.state.updateParent(this.state)
    )
  }

  handleSelect(ev) {
    this.setState({ budget_item_id: ev.value },
      () => this.state.updateParent(this.state)
     )
  }

  removeSubtransaction() {
    this.state.removeSubtransaction(this.state._id)
  }

  render() {
    return (
      <div className="subtransaction-form-row">
        <Link
         to="#"
         className="fas fa-times-circle"
         onClick={this.removeSubtransaction}
        />
        <div className="input description">
          <input
           name="description"
           value={this.state.description}
           onChange={this.handleChange}
           placeholder="description"
          />
        </div>
        <div className="input amount">
          <input
           name="amount"
           value={this.state.amount}
           onChange={this.handleChange}
           placeholder="amount"
          />
        </div>
        <div className="input bi-select">
          <div className='budget-item-select'>
            <BudgetItemSelect
             updateSelect={this.handleSelect}
             hasSubtransactions={false}
            />
          </div>
        </div>
      </div>
    )
  }
}

SubtransactionForm.defaultProps = {
  description: '',
  amount: '',
}

export default SubtransactionForm;
