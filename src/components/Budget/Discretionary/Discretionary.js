import React, { Component } from "react"
import { connect } from "react-redux"
import ApiUrlBuilder from "../../../shared/Functions/ApiUrlBuilder"
import { fetchedDiscretionary } from "../../../actions/budget"
import DiscretionaryContainer from "./DiscretionaryContainer"

class Discretionary extends Component {
  componentWillMount() {
    const url = ApiUrlBuilder(['budget', 'discretionary'])
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.props.dispatch(fetchedDiscretionary(data))
      })
  }

  render() {
    return (
      <DiscretionaryContainer />
    )
  }
}

export default connect((_state, ownProps) => ownProps)(Discretionary)
