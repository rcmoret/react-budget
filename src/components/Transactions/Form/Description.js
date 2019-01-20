import React from "react"

const Description = (props) => (
  <div className="description">
    <input
     type="text"
     name="description"
     placeholder="description"
     onChange={props.updateTransaction}
     value={props.description}
    />
  </div>
)

export default Description
