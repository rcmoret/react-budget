import React from "react"

const Form = (props) => (
  <div>
    <label>Name</label>
    <input type="text" name="category[name]" onChange={props.updateName} value={props.name} />
    <label>Default Amount</label>
    <input type="text" name="category[default_amount]" onChange={props.updateDefaultAmount} value={props.default_amount} />
    <label>Expense</label>
    <input type="radio"
     name="category[expense]"
     value="true"
     onChange={props.updateExpense}
     checked={props.expense === "true" ? "checked" : ""}
     />
    <label>Revenue</label>
    <input type="radio"
     name="category[expense]"
     value="false"
     onChange={props.updateExpense}
     checked={props.expense === "false" ? "checked" : ""}
     />
    <label>Monthly</label>
    <input type="radio"
     name="category[monthly]"
     value="true"
     onChange={props.updateMonthly}
     checked={props.monthly === "true" ? "checked" : ""}
     />
    <label>Weekly</label>
    <input type="radio"
     name="category[monthly]"
     value="false"
     onChange={props.updateMonthly}
     checked={props.monthly === "false" ? "checked" : ""}
     />
    <br/>
    <button type="submit" onClick={props.createNewCategory}>
      Create
    </button>
  </div>
)

export default Form
