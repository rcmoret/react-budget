import { ApolloClient } from "apollo-boost"
import { HttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"

const link = new HttpLink({
  uri: "http://my.budget:3090/graphql"
})

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})
