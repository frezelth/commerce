const getAllProductsPathsQuery = /* GraphQL */ `
  query getAllProductPaths(
    $pageSize: Int = 250
    $currentPage: Int
    $search: String = ""
  ) {
    products(pageSize: $pageSize, currentPage: $currentPage, search: $search) {
      page_info {
        current_page
        page_size
        total_pages
      }
      items {
        url_key
      }
    }
  }
`
export default getAllProductsPathsQuery
