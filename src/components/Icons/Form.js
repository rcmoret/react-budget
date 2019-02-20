import React from "react"
import { connect } from "react-redux"
import Icon from "./Icon"

const Form = ({ buttonText, class_name, name, onChange, onSubmit }) => (
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
          onClick={onSubmit}
        >
          {buttonText}
        </button>
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
  const { icon, onChange, onSubmit } = ownProps
  return {
    buttonText: "Create",
    ...icon,
    onSubmit: onSubmit,
    onChange: onChange,
  }


}
export default connect(mapStateToProps)(Form)
