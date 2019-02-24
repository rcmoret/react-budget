import React from "react"

import CancelButton from "./CancelButton"
import IconSelect from "./IconSelect"

export default (props) => (
  <div className="budget-category">
    <div className="category-name">
      <input
        type="text"
        name="name"
        onChange={props.onChange}
        value={props.name}
        placeholder="name"
      />
    </div>
    <div className="category-default-amount">
      <input
        type="text"
        name="default_amount"
        onChange={props.onChange}
        value={props.default_amount}
        placeholder="default amount"
      />
    </div>
    <div className="category-options">
      <div className="option">
        <div className="label">Monthly</div>
        <input type="radio"
         name="monthly"
         value={true}
         onChange={props.onChange}
         checked={props.monthly === "true" ? "checked" : ""}
         disabled={props.optionsDisabled}
         />
      </div>
      <div className="option">
        <div className="label">Weekly</div>
        <input type="radio"
         name="monthly"
         value={false}
         onChange={props.onChange}
         checked={props.monthly === "false" ? "checked" : ""}
         disabled={props.optionsDisabled}
         />
      </div>
    </div>
    <div className="category-options">
      <div className="option">
        <div className="label">Expense</div>
        <input type="radio"
         name="expense"
         value={true}
         onChange={props.onChange}
         checked={props.expense === "true" ? "checked" : ""}
         disabled={props.optionsDisabled}
         />
      </div>
      <div className="option">
        <div className="label">Revenue</div>
        <input type="radio"
         name="expense"
         value={false}
         onChange={props.onChange}
         checked={props.expense === "false" ? "checked" : ""}
         disabled={props.optionsDisabled}
         />
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
