import { client } from "../../../functions/ApolloClient"
import gql from "graphql-tag"

export const getItems = (args) => {
  const {
    month,
    onSuccess,
    year,
  } = args

  client.query({
    query: gql(`
      {
        budgetItems(month: ${month}, year: ${year}) {
          metadata {
            balance
            daysRemaining
            month
            isSetUp
            isClosedOut
            spent
            totalDays
            year
          }
          collection {
            id
            accrual
            amount
            budgetCategoryId
            expense
            iconClassName
            maturityMonth
            maturityYear
            month
            monthly
            name
            spent
            transactionCount
            year
          }
        }
      }
    `)
  })
    .then(result => onSuccess(result))
}

