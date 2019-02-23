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
  const labelFor = (icon) => <span>{icon.name} <span className={icon.class_name}></span></span>
  const iconOptions = collection.map(icon => {
    return { value: icon.id, label: labelFor(icon) }
  })
  const options = [{ value: null, label: "" }, ...iconOptions]
  const value = options.find(option => option.value === ownProps.iconId)

  return {
    options: options,
    onChange: ownProps.onChange,
    value: value,
  }
}

export default connect(mapStateToProps)(IconSelect)
