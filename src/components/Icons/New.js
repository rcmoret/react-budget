import React from "react"
import { connect } from "react-redux"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { created, updateNew } from "../../actions/icons"
import Form from "./Form/Form"

const New = (props) => {
  const onChange = (e) => {
    const action = updateNew({[e.target.name]: e.target.value })
    this.props.dispatch(action)
  }

  const onSubmit = (e) => {
    const url = ApiUrlBuilder(["icons"])
    fetch(url, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.newIcon),
  })
  .then(resp => resp.json())
  .then(data => props.dispatch(created(data)))
  }

  return (
    <Form
      buttonText="Create"
      icon={props.newIcon}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return { newIcon: state.icons.newIcon }
}

export default connect(mapStateToProps)(New)
