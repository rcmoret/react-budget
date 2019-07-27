import React from "react"

import { account as copy } from "../../../locales/copy"
import { titleize } from "../../../locales/functions"

import Icon from "../../Icons/Icon"
import ResetButton from "./ResetButton"

const {
  cancelButtonText,
  cashFlow,
  createButtonText,
  name,
  priority,
  updateButtonText,
} = copy

export default (props) => (
  <div className="account-edit">
    <div>
      <h3>
        {props.title}
      </h3>
      <hr />
      <div className="form-row">
        <div className="label">
          <label>
            {name}
          </label>
        </div>
        <div className="input">
          <input type="text" name="name" value={props.name} onChange={props.updateName} />
        </div>
      </div>
      <div className="form-row">
        <div className="label">
          <label>
            {priority}
          </label>
        </div>
        <div className="input">
          <input type="number" name="priority" value={props.priority} onChange={props.updatePriority} />
        </div>
      </div>
      <div className="form-row">
        <div className="label">
          <label>
            {cashFlow}
          </label>
        </div>
        <div className="input">
          <input
            type="checkbox"
            name="cash_flow"
            checked={props.cash_flow}
            onChange={props.updateCashFlow}
          />
        </div>
      </div>
      <div className="form-row">
        <ResetButton {...props} />
        <button type="submit" className="submit" onClick={props.submitForm}>
          {titleize(props.id ? updateButtonText : createButtonText)} <Icon className="far fa-save" />
        </button>
        <button type="cancel" className="cancel" onClick={props.closeForm}>
          {titleize(cancelButtonText)} <Icon className="fas fa-times" />
        </button>
      </div>
    </div>
  </div>
)
