import React from "react"
import { connect } from "react-redux"
import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { created, updateNew } from "./actions"
import Form from "./Form/Form"

const New = (props) => {
  const onChange = (e) => {
    const action = updateNew({[e.target.name]: e.target.value })
    props.dispatch(action)
  }

  const onSubmit = () => {
    const url = ApiUrlBuilder(["icons"])
    fetch(url, {
      method: "POST",
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

const mapStateToProps = (state) => {
  return { newIcon: state.icons.newIcon }
}

export default connect(mapStateToProps)(New)
