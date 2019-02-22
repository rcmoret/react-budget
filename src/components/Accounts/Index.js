import React, { Component } from "react"
import ApiUrlBuilder from "../../shared/Functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { fetched } from "../../actions/accounts"
import New from "./New"
import Show from "./Show"

class Index extends Component {
  componentWillMount() {
    if (this.props.collection.length === 0) {
      fetch(ApiUrlBuilder(["accounts"]))
        .then(response => response.json())
        .then(data => this.props.dispatch(fetched(data)))
    }
  }

  render() {
    const { collection } = this.props
    return (
      <div className="accounts">
        <div className="account-show">
          {collection.map(account =>
            <Show
              key={account.id}
              {...account}
            />
          )}
          <New />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { collection } = state.accounts
  const accounts = collection.sort((a, b) => {
    return a.priority - b.priority
  })

  return { collection: accounts }
}

export default connect(mapStateToProps)(Index)
