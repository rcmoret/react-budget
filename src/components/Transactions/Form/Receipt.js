import React from "react"

import { Link } from "react-router-dom"

export default ({ formOptions, onChange, toggleFormOption }) => {
  const handleImageChange = event => {
    const file = event.target.files[0]
    onChange({ receipt: file })
  }

  if (formOptions.showReceipt) {
    return (
      <div className="option-input receipt">
        <Link to="#" onClick={toggleFormOption} name="showReceipt" className="fas fa-paperclip" />
        <input type="file" name="receipt" onChange={handleImageChange} />
      </div>
    )
  } else {
    return null
  }
}

