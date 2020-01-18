import { client } from "../../functions/ApolloClient"
import gql from "graphql-tag"

export const getIcons = (onSuccess) => {
  client.query({
    query: gql(`
      {
        icons {
          id
          name
          className: class_name
        }
      }
    `)
  })
    .then(result => onSuccess(result))
}
