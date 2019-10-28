import { client } from "../../../functions/ApolloClient"
import gql from "graphql-tag"

export const getCategories = (onSuccess) => {
  client.query({
    query: gql(`
      {
        budgetCategories {
          id
          name
          defaultAmount
          expense
          monthly
          accrual
          iconClassName
          iconId
        }
      }
    `)
  })
    .then(result => onSuccess(result))
}
