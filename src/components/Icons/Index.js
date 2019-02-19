import React, { Component } from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { iconsFetched } from "../../actions/icons"
import Show from "./Show"

class Index extends Component {
  componentWillMount() {
    if (!this.props.fetched) {
      const url = ApiUrlBuilder(["icons"])
      fetch(url)
      .then(response => response.json())
      .then(data => this.props.dispatch(iconsFetched(data)))
    }
  }

  componentWillReceiveProps() {
    console.log(this.props)
    if (!this.props.fetched) {
      const url = ApiUrlBuilder(["icons"])
      fetch(url)
      .then(response => response.json())
      .then(data => this.props.dispatch(iconsFetched(data)))
    }
  }

  render() {
    return (
      <div className="categories">
        {this.props.collection.map(icon =>
          <Show
            key={icon.id}
            {...icon}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { fetched } = state.icons
  const collection = state.icons.collection.sort((a, b) => {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  })
  return {
    collection: collection,
    fetched: fetched,
  }
}

export default connect(mapStateToProps)(Index)
