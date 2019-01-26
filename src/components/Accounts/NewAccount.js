import React from "react"
import { connect } from "react-redux"
import { toggleShowNewForm } from "../../actions/accounts"
import AccountForm from "./AccountForm"
import AddNewRow from "./AddNewRow"

const NewAccount = (props) => {
  const showForm = (e) => {
    e.preventDefault()
    props.dispatch(toggleShowNewForm({ showForm: true }))
  }

  const closeForm = (e) => {
    e.preventDefault()
    props.dispatch(toggleShowNewForm({ showForm: false }))
  }

  if (props.showNewForm) {
    return (
      <AccountForm closeForm={closeForm} />
    )
  } else {
    return(
      <AddNewRow showForm={showForm} />
    )
  }
}

NewAccount.defaultProps = {
  showNewForm: false,
}

const mapStateToProps = (state) => {
  return { showNewForm: state.accounts.showNewForm }
}

export default connect(mapStateToProps)(NewAccount)
