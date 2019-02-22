import React from "react"
import ResetButton from "./ResetButton"
import Icon from "../../Icons/Icon"

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
            Name
          </label>
        </div>
        <div className="input">
          <input type="text" name="name" value={props.name} onChange={props.updateName} />
        </div>
      </div>
      <div className="form-row">
        <div className="label">
          <label>
            Priority
          </label>
        </div>
        <div className="input">
          <input type="number" name="priority" value={props.priority} onChange={props.updatePriority} />
        </div>
      </div>
      <div className="form-row">
        <div className="label">
          <label>
            Cash Flow
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
          {props.id ? "Update" : "Create"} Account <Icon className="far fa-save" />
        </button>
        <button type="cancel" className="cancel" onClick={props.closeForm}>
          Cancel <Icon className="fas fa-times" />
        </button>
      </div>
    </div>
  </div>
)
