import React, { Component } from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { fetched } from "./actions"
import New from "./New"
import Show from "./Show"

class Index extends Component {
  componentWillMount() {
    if (!this.props.fetched) {
      const url = ApiUrlBuilder(["icons"])
      fetch(url)
      .then(response => response.json())
      .then(data => this.props.dispatch(fetched(data)))
    }
  }

  componentWillReceiveProps() {
    if (!this.props.fetched) {
      const url = ApiUrlBuilder(["icons"])
      fetch(url)
      .then(response => response.json())
      .then(data => this.props.dispatch(fetched(data)))
    }
  }

  render() {
    return (
      <div className="icons">
        <div className="new-icon-form">
          <New />
        </div>
        <div className="column">
          {this.props.firstColumn.map(icon =>
            <Show
              key={icon.id}
              icon={icon}
            />
          )}
        </div>
        <div className="column">
          {this.props.secondColumn.map(icon =>
            <Show
              key={icon.id}
              icon={icon}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { fetched } = state.icons
  const collection = state.icons.collection.sort((a, b) => {
    return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  })
  const count = collection.length
  const columnSize = Math.ceil(count / 2.0)
  const firstColumn = collection.slice(0, columnSize)
  const secondColumn = collection.slice(columnSize, (columnSize * 2))
  return {
    firstColumn: firstColumn,
    secondColumn: secondColumn,
    fetched: fetched,
    newIcon: state.icons.newIcon,
  }
}

export default connect(mapStateToProps)(Index)
