import { client } from "../../../functions/ApolloClient"
import gql from "graphql-tag"

export const getCategories = (onSuccess) => {
  client.query({
    query: gql(`
      {
        budgetCategories: budget_categories {
          id
          name
          defaultAmount: default_amount
          expense
          monthly
          accrual
          iconClassName: icon_class_name
          iconId: icon_id
        }
      }
    `)
  })
    .then(result => onSuccess(result))
}
