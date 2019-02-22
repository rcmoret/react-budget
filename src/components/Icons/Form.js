import React from "react"
import { connect } from "react-redux"
import Icon from "./Icon"
import ResetButton from "./ResetButton"

const Form = ({ buttonText, class_name, id, name, onChange, onSubmit }) => (
  <div className="icon-form">
    <div className="icon-form-row">
      <div>
        <label>
          Name
        </label>
      </div>
      <div>
        <input
          name="name"
          onChange={onChange}
          value={name}
        />
      </div>
    </div>
    <div className="icon-form-row">
      <div>
        <label>
          Class Name
        </label>
      </div>
      <div>
        <input
          name="class_name"
          onChange={onChange}
          value={class_name}
        />
      </div>
    </div>
    <div className="icon-form-row">
      <div>
        <button
          type="submit"
          className="submit"
          onClick={onSubmit}
        >
          {buttonText}
        </button>
      </div>
      <div>
        <ResetButton
          id={id}
          reset
        />
      </div>
    </div>
    <div className="icon-form-row">
      <span className="preview">
        Preview:
        {"  "}
        <Icon className={class_name} />
      </span>
    </div>
  </div>
)

const mapStateToProps = (_state, ownProps) => {
  const { buttonText, icon, onChange, onSubmit } = ownProps
  return {
    buttonText: buttonText,
    ...icon,
    onSubmit: onSubmit,
    onChange: onChange,
  }


}
export default connect(mapStateToProps)(Form)
