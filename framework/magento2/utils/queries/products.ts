export const productConnection = `
page_info {
  current_page
  page_size
  total_pages
}
items {
  uid
  name
  sku
  url_key
  manufacturer
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
  media_gallery {
    url
  }
  image {
    url
  }
  hover_image
}
aggregations {
  attribute_code
  label
  options{
    count
    label
    value
  }
} `

export const productsFragment = `
products(
  search: $search
  pageSize: $pageSize
  filter: {
    category_uid {
      eq: $categoryFilter
    }
  }
) {
  ${productConnection}
}
`

export const Products = /* GraphQL */ `
  query getAllProducts(
    $search: String = ""
    $pageSize: Int = 24
    $categoryFilter: String = ""
  ) {
    ${productsFragment}
  }
`
