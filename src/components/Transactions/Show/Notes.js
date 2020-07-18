import React from "react"
import Icon from "../../Icons/Icon"

export default ({ notes }) => {
  if (notes) {
    return(
      <div className="notes">
        <div className="notes-icon">
          <Icon className="fas fa-sticky-note" />
        </div>
        <div className="notes-content">
          {notes.split("<br>").map((note, index) => (
            <Note key={index} note={note} />
          ))}
        </div>
      </div>
    )
  } else {
    return null
  }
}

const Note = ({ note }) => (
  <div className="note-line">
    {note}
  </div>
)
