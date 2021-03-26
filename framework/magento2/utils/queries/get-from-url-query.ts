const getFromUrlQuery = /* GraphQL */ `
  query getFromUrlQuery($url: String!) {
    urlResolver(url: $url) {
      entity_uid
      relative_url
      redirectCode
      type
    }
  }
`
export default getFromUrlQuery
