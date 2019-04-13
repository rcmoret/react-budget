import React from "react"
import { connect } from "react-redux"
import Select from "react-select"

const IconSelect = ({ options, onChange, value }) => (
  <div className="budget-icon-select">
    <Select
      options={options}
      isSearchable={true}
      onChange={onChange}
      value={value}
    />
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const { collection } = state.icons
  const iconOptions = collection.map(icon => (
    { value: icon.id, label: icon.name }
  ))
  const options = [{ value: null, label: "" }, ...iconOptions]
  const value = options.find(option => option.value === ownProps.iconId)

  return {
    options: options,
    onChange: ownProps.onChange,
    value: value,
  }
}

export default connect(mapStateToProps)(IconSelect)
