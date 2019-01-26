import React from "react"
import { connect } from "react-redux"
import { addNew, resetForm, updateNew } from "../../actions/accounts"
import AccountFormContainer from './AccountFormContainer'
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"

const AccountForm = (props) => {
  const updateName = (e) => {
    props.dispatch(updateNew({ name: e.target.value }))
  }

  const updatePriority = (e) => {
    props.dispatch(updateNew({ priority: e.target.value }))
  }

  const updateCashFlow = (e) => {
    props.dispatch(updateNew({ cash_flow: !props.cash_flow }))
  }

  const submitForm = (_e) => {
    const url  = ApiUrlBuilder(["accounts"])
    const body = {
      name: props.name,
      priority: props.priority,
      cash_flow: props.cash_flow,
    }
    fetch(url,
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then(resp => resp.json())
      .then(data => props.dispatch(addNew(data)))
      .then(() => props.dispatch(resetForm()))
  }

  return (
    <AccountFormContainer
      {...props}
      updateName={updateName}
      updatePriority={updatePriority}
      updateCashFlow={updateCashFlow}
      submitForm={submitForm}
    />
  )
}

AccountForm.defaultProps = {
  name: "",
  priority: "",
  cash_flow: true,
}

export default connect(state => state.accounts.newAccount)(AccountForm)
