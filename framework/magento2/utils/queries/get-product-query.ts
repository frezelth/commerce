const getProductQuery = /* GraphQL */ `
  query getProductsByUrl($slug: String, $pageSize: Int = 1) {
    products(filter: { url_key: { eq: $slug } }, pageSize: $pageSize) {
      items {
        uid
        name
        sku
        manufacturer
        media_gallery {
          url
        }
        image {
          url
        }
        hover_image
        url_key
        url_suffix
        description {
          html
        }
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
          }
        }
      }
      total_count
      filters {
        name
        filter_items_count
        request_var
        filter_items {
          label
          value_string
        }
      }
    }
  }
`

export default getProductQuery
