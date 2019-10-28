import { client } from "../../functions/ApolloClient"
import gql from "graphql-tag"

export const getTransfers = (args) => {
  const {
    limit,
    page,
    onSuccess
  } = args

  client.query({
    query: gql(`
      {
        transfers(limit: ${limit}, page: ${page}) {
          metadata {
            limit
            offset
            total
            viewing
          }
          collection {
            id
            fromTransaction {
              accountId
              accountName
              clearanceDate
            }
            toTransaction {
              accountId
              accountName
              clearanceDate
              details {
                amount
              }
            }
          }
        }
      }
    `)
  })
    .then(result => onSuccess(result))
}
