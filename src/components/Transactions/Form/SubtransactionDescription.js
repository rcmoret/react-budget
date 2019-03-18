import React from "react"

export default ({ _id, description, onSubChange }) => {
  const onChange = (e) => {
    onSubChange(_id, { description: e.target.value })
  }

  return (
    <div className="subtransaction">
      <input
       type="text"
       name="description"
       placeholder="description"
       onChange={onChange}
       value={description}
      />
    </div>
  )
}
