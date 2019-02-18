import React from "react"
import { connect } from "react-redux"
import BudgetItemSelect from "./BudgetItemSelect"
import { Link } from "react-router-dom"
import { editSubtransaction, removeSubtransaction } from "../../../actions/transactions"

const SubtransactionForm = (props) => {
  const remove = (e) => {
    e.preventDefault()
    props.dispatch(removeSubtransaction({ _id: props._id }))
  }

  const handleChange = (e) => {
    props.dispatch(editSubtransaction({
      _id: props._id,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelect = (e) => {
    props.dispatch(editSubtransaction({
      _id: props._id,
      budget_item_id: e.value,
    }))
  }

  return (
    <div className="subtransaction-form-row">
      <Link
       to="#"
       className="fas fa-times-circle"
       onClick={remove}
      />
      <div className="input description">
        <input
         name="description"
         value={props.description}
         onChange={handleChange}
         placeholder="description"
        />
      </div>
      <div className="input amount">
        <input
         name="amount"
         value={props.amount}
         onChange={handleChange}
         placeholder="amount"
        />
      </div>
      <div className="input bi-select">
        <div className='budget-item-select'>
          <BudgetItemSelect
           updateSelect={handleSelect}
           hasSubtransactions={false}
           budgetItemId={props.budget_item_id}
          />
        </div>
      </div>
    </div>
  )
}

export default connect((_state, ownProps) => ownProps)(SubtransactionForm)
