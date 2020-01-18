import { client } from "../../../../functions/ApolloClient"
import gql from "graphql-tag"

export const getMaturityIntervals = (categoryId, onSuccess) => {
  client.query({
    query: gql(`
       {
         budgetCategory: budget_category(id: ${categoryId}) {
           maturityIntervals: maturity_intervals {
             id
             categoryId: category_id
             month
             year
           }
         }
       }
    `)
  })
    .then(result => onSuccess(result))
}
