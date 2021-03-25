export const getPageQuery = /* GraphQL */ `
  query($id: ID!) {
    cmsPage(identifier: $id) {
      identifier
      url_key
      title
      content
      content_heading
      page_layout
      meta_title
      meta_description
      meta_keywords
    }
  }
`
export default getPageQuery
