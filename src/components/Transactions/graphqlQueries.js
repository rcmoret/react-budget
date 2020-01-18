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
        transactions(account_id: ${accountId}, year: ${year}, month: ${month}) {
          metadata {
            accountId: account_id
            dateRange: date_range
            includePending: include_pending
            month
            priorBalance: prior_balance
            year
          }
          collection {
            id
            accountId: account_id
            budgetExclusion: budget_exclusion
            checkNumber: check_number
            clearanceDate: clearance_date
            description
            details {
              amount
              budgetCategory: budget_category
              budgetItemId: budget_item_id
              iconClassName: icon_class_name
            }
            notes
          }
        }
      }
    `)
  })
    .then(result => onSuccess(result))
}
