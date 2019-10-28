import { client } from "../../functions/ApolloClient"
import gql from "graphql-tag"

export const getAccounts = (onSuccess) => {
  client.query({
    query: gql(`
      {
        accounts {
          id
          name
          priority
          balance
          cashFlow
        }
      }
    `)
  })
    .then(result => onSuccess(result))
}
