import React from "react"
import { Link } from "react-router-dom"
import Amount from "./Amount"
import CheckNumber from "./CheckNumber"
import BudgetExclusion from "./BudgetExclusion"
import BudgetItemSelect from "./BudgetItemSelect"
import ClearanceDate from "./ClearanceDate"
import Description from "./Description"
import Notes from "./Notes"
import Submit from "./Submit"
import SubtransactionsButton from "./SubtransactionsButton"
import SubtransactionsForm from "./SubtransactionsForm"

const FormContainer = (props) => (
  <div className="transaction-wrapper">
    <div className="transaction">
      <div className="transaction-form-row">
        <Link to="#" onClick={props.closeForm} className="fas fa-times" />
        <ClearanceDate clearanceDate={props.clearance_date} updateTransaction={props.updateTransaction} />
        <Description
          description={props.description}
          updateTransaction={props.updateTransaction}
        />
        <Amount
          amount={props.amount}
          disabled={props.disabled}
          updateTransaction={props.updateTransaction}
        />
        <BudgetItemSelect
         updateSelect={props.updateSelect}
         disabled={props.disabled}
        />
        <Submit submitTransaction={props.submitTransaction} />
      </div>
      <SubtransactionsForm
       {...props}
       removeSubtransaction={props.removeSubtransaction}
       updateParent={props.updateParent}
      />
      <div className="transaction-form-row options">
        <SubtransactionsButton
         subtransactions={props.subtransactions}
         addSubtransactions={props.addSubtransactions}
         addSubtransaction={props.addSubtransaction}
        />
        <CheckNumber checkNumber={props.checkNumber} updateTransaction={props.updateTransaction} />
        <Notes notes={props.notes} updateTransaction={props.updateTransaction} />
        <BudgetExclusion onChange={props.updateTransaction} {...props} />
      </div>
    </div>
  </div>
)

export default FormContainer
