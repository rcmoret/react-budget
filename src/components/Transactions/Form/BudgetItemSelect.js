import React, { Component } from 'react'
import Select from 'react-select';
import ApiUrlBuilder from '../../../shared/Functions/ApiUrlBuilder';
import MoneyFormatter from '../../../shared/Functions/MoneyFormatter';

class BudgetItemSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      value: { value: null, label: ''},
      ...props
    }
    this.options = this.options.bind(this)
    this.discretionaryRow = this.discretionaryRow.bind(this)
    this.defaultRow = this.defaultRow.bind(this)
    this.emptyRow = this.emptyRow.bind(this)
    this.updateSelect = this.updateSelect.bind(this)
    this.formattedOptions = this.formattedOptions.bind(this)
    this.sortedOptions = this.sortedOptions.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasSubtransactions) {
      this.setState({ selectValue: this.emptyRow(), value: this.emptyRow(), ...nextProps })
    } else {
      this.setState(nextProps)
    }
  }

  componentWillMount() {
    fetch(ApiUrlBuilder(['budget', 'selectable']))
      .then(response => response.json())
      .then(data => this.setState({
        items: data
      })
    )
  }

  discretionaryRow() {
    return { value: null, label: 'Discretionary' }
  }

  emptyRow() {
    return { value: null, label: '' }
  }


  defaultRow() {
    return this.state.hasSubtransactions ? this.emptyRow() : this.discretionaryRow()
  }

  formattedOptions() {
    if (!this.state.hasSubtransactions) {
      return this.state.items.map((item) => {
        const remaining = item.remaining === undefined ? item.amount : item.remaining
        return { value: item.id, label: [item.name, MoneyFormatter(remaining)].join(':  ') }
      })
    } else {
      return [this.emptyRow()]
    }
  }

  sortedOptions() {
    return this.formattedOptions().sort((a, b) => {
      return a.name > b.name
    })
  }

  options() {
    return [this.defaultRow(), ...this.sortedOptions()]
  }

  updateSelect(ev) {
    this.setState({ value: ev })
    this.state.updateSelect(ev)
  }

  render() {
    return (
      <Select
        value={this.state.value}
        defaultValue={this.state.value}
        onChange={this.updateSelect}
        options={this.options()}
        className="budget-item-select-container"
        classNamePrefix="budget-item-select"
        isSearchable={!this.state.hasSubtransactions}
        isDisabled={this.state.hasSubtransactions}
      />
    )
  }
}

export default BudgetItemSelect;
