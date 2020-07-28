import React from "react"
import { connect } from "react-redux"

import Icon from "../Icons/Icon"
import { Link } from "react-router-dom"

import { toggleEvents } from "./actions"

const Events = ({ dispatch, events, showEvents }) => {
  const onClick = () => dispatch(toggleEvents())

  if (events.length === 0) {
    return (
      <div className="top-level-events">
      </div>
    )
  } else if (showEvents) {
    return (
      <div className="top-level-events">
        <h3>
          <Link
            to="#"
            onClick={onClick}
          >
            <Icon className= "fas fas-book-open" />
            {" "}
            Events
          </Link>
        </h3>
        <div className="events">
          {events.map((event, index) => (
            <Event key={index} event={event} />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className="top-level-events">
        <h3>
          <Link
            to="#"
            onClick={onClick}
          >
            <Icon className= "fas fas-book" />
            {" "}
            Events
          </Link>
        </h3>
      </div>
    )
  }
}

const Event = ({ event }) => (
  <div className="event-message">
    {event}
  </div>
)

const mapStateToProps = state => ({ events: state.messages.events, showEvents: state.messages.showEvents })

export default connect(mapStateToProps)(Events)
