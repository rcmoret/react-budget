import React, { Component } from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { createIcon, editNewIcon, iconsFetched } from "../../actions/icons"
import NewIconForm from "./Form"
import Show from "./Show"

class Index extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {
    if (!this.props.fetched) {
      const url = ApiUrlBuilder(["icons"])
      fetch(url)
      .then(response => response.json())
      .then(data => this.props.dispatch(iconsFetched(data)))
    }
  }

  componentWillReceiveProps() {
    if (!this.props.fetched) {
      const url = ApiUrlBuilder(["icons"])
      fetch(url)
      .then(response => response.json())
      .then(data => this.props.dispatch(iconsFetched(data)))
    }
  }

  onChange(e) {
    this.props.dispatch(editNewIcon({ [e.target.name]: e.target.value }))
  }

  onSubmit() {
    const url = ApiUrlBuilder(["icons"])
    fetch(url, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.props.newIcon),
  })
  .then(resp => resp.json())
  .then(data => this.props.dispatch(createIcon(data)))
  }

  render() {
    return (
      <div className="icons">
        <div className="new-icon-form">
          <NewIconForm
            icon={this.props.newIcon}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </div>
        <div className="column">
          {this.props.firstColumn.map(icon =>
            <Show
              key={icon.id}
              {...icon}
            />
          )}
        </div>
        <div className="column">
          {this.props.secondColumn.map(icon =>
            <Show
              key={icon.id}
              {...icon}
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
