import React from "react"

import CancelButton from "./CancelButton"
import IconSelect from "./IconSelect"

export default (props) => (
  <div className="budget-category">
    <CategoryInput
      className="category-name"
      errors={props.errors.name || []}
      name="name"
      onChange={props.onChange}
      placeholder="name"
      value={props.name}
    />
    <CategoryInput
      className="category-default-amount"
      errors={props.errors.default_amount || []}
      name="default_amount"
      onChange={props.onChange}
      placeholder="default amount"
      value={props.default_amount}
    />
    <div className="category-options">
      <Option
        checked={props.monthly === "true" ? "checked" : ""}
        disabled={props.optionsDisabled}
        name="monthly"
        onChange={props.onChange}
        title="Monthly"
        value={true}
      />
      <Option
        checked={props.monthly === "false" ? "checked" : ""}
        disabled={props.optionsDisabled}
        name="monthly"
        onChange={props.onChange}
        title="Day-to-Day"
        value={false}
      />
    </div>
    <div className="category-options">
      <Option
        checked={props.expense === "true" ? "checked" : ""}
        disabled={props.optionsDisabled}
        name="expense"
        onChange={props.onChange}
        title="Expense"
        value={true}
      />
      <Option
        checked={props.expense === "false" ? "checked" : ""}
        disabled={props.optionsDisabled}
        name="expense"
        onChange={props.onChange}
        title="Revenue"
        value={false}
      />
    </div>
    <div className="category-options">
      <div className="option">
        <div className="label">Accrual</div>
        <input type="checkbox"
          name="accrual"
          value={props.accrual === "true" ? "false" : "true"}
          onChange={props.onChange}
          checked={props.accrual === "true" ? "checked" : ""}
        />
        <Errors errors={props.errors.accrual || []} />
      </div>
    </div>
    <IconSelect
      onChange={props.onSelectChange}
      iconId={props.icon_id}
    />
    <div className="category-button">
      <button type="submit" className="submit" onClick={props.onSubmit}>
        {props.label}
      </button>
    </div>
    <div className="category-button">
      <button type="reset" className="reset" onClick={props.resetForm}>
        Reset
      </button>
    </div>
    <CancelButton
      {...props}
    />
  </div>
)

const CategoryInput = ({ className, errors, name, onChange, placeholder, value }) => {
  return (
    <div className={className}>
      <input
        className={errors.length > 0 ? "errors" : ""}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        value={value}
      />
      <Errors errors={errors} />
    </div>
  )
}

const Errors = ({ errors }) => {
  if (errors.length === 0) {
    return null
  } else {
    return (
      <ul className="input-errors">
        {errors.map((error, i) =>
          <Error
            key={i}
            error={error}
          />
        )}
      </ul>
    )
  }
}

const Error = ({ error }) => (
  <li className="input-error">
    {error}
  </li>
)

const Option = ({ checked, disabled, name, onChange, title, value }) => (
  <div className="option">
    <div className="label">{title}</div>
    <input type="radio"
      checked={checked}
      disabled={disabled}
      name={name}
      onChange={onChange}
      value={value}
    />
  </div>
)
