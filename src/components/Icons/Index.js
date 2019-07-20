import React from "react"
import ApiUrlBuilder from "../../functions/ApiUrlBuilder"
import { connect } from "react-redux"
import { fetched } from "./actions"
import New from "./New"
import Show from "./Show"

const Index = (props) => {
  const {
    dispatch,
    collectionFetched,
    firstColumn,
    secondColumn,
  } = props

  if (!collectionFetched) {
    const url = ApiUrlBuilder(["icons"])
    fetch(url)
      .then(response => response.json())
      .then(data => dispatch(fetched(data)))
  }

  return (
    <div className="icons">
      <div className="new-icon-form">
        <New />
      </div>
      <div className="column">
        {firstColumn.map(icon =>
          <Show
            key={icon.id}
            icon={icon}
          />
        )}
      </div>
      <div className="column">
        {secondColumn.map(icon =>
          <Show
            key={icon.id}
            icon={icon}
          />
        )}
      </div>
    </div>
  )
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
    collectionFetched: fetched,
    newIcon: state.icons.newIcon,
  }
}

export default connect(mapStateToProps)(Index)
