import React from "react"

import { budget as copy } from "../../../../locales/copy"
import { titleize } from "../../../../locales/functions"

import CancelButton from "./CancelButton"
import Errors from "../../../Errors/Errors"
import IconSelect from "./IconSelect"

export default (props) => (
  <div className="budget-category">
    <CategoryInput
      className="category-name"
      errors={props.errors.name || []}
      name="name"
      onChange={props.onChange}
      placeholder={copy.category.name}
      value={props.name}
    />
    <CategoryInput
      className="category-slug"
      errors={props.errors.slug || []}
      name="slug"
      onChange={props.onChange}
      placeholder={copy.category.slug}
      value={props.slug || ""}
    />
    <CategoryInput
      className="category-default-amount"
      errors={props.errors.default_amount || []}
      name="default_amount"
      onChange={props.onChange}
      placeholder={copy.category.defaultAmount}
      value={props.default_amount}
    />
    <div className="category-options">
      <Option
        checked={props.monthly === "true" ? "checked" : ""}
        disabled={props.optionsDisabled}
        name={props.monthlyName}
        onChange={props.onChange}
        title={copy.category.monthly}
        value={true}
      />
      <Option
        checked={props.monthly === "false" ? "checked" : ""}
        disabled={props.optionsDisabled}
        name={props.monthlyName}
        onChange={props.onChange}
        title={titleize(copy.category.weekly)}
        value={false}
      />
    </div>
    <div className="category-options">
      <Option
        checked={props.expense === "true" ? "checked" : ""}
        disabled={props.optionsDisabled}
        name={props.expenseName}
        onChange={props.onChange}
        title={copy.category.expense}
        value={true}
      />
      <Option
        checked={props.expense === "false" ? "checked" : ""}
        disabled={props.optionsDisabled}
        name={props.expenseName}
        onChange={props.onChange}
        title={copy.category.revenue}
        value={false}
      />
    </div>
    <div className="category-options">
      <div className="option">
        <div className="label">{titleize(copy.category.accrual)}</div>
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

const Option = ({ checked, disabled, name, onChange, title, value }) => (
  <div className="option">
    <div className="label">{titleize(title)}</div>
    <input type="radio"
      checked={checked}
      disabled={disabled}
      name={name}
      onChange={onChange}
      value={value}
    />
  </div>
)
