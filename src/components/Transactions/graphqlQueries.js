import { client } from "../../functions/ApolloClient"
import gql from "graphql-tag"

export const getTransactions = (args) => {
  const {
    accountId,
    month,
    year,
    onSuccess,
  } = args

  client.query({
    query: gql(`
      {
        transactions(accountId: ${accountId}, year: ${year}, month: ${month}) {
          metadata {
            accountId
            dateRange
            includePending
            month
            priorBalance
            year
          }
          collection {
            id
            accountId
            budgetExclusion
            checkNumber
            clearanceDate
            description
            details {
              amount
              budgetCategory
              budgetItemId
              iconClassName
            }
            notes
          }
        }
      }
    `)
  })
    .then(result => onSuccess(result))
}
