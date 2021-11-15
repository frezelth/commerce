export const CategoryList = /* GraphQL */ `
  query CategoryList (
    $path: String = ""
  ){
  categoryList(
    filters: {
      url_path {
        eq: $path
      }
    }
  ) {
    items {
      uid
      name
      url_path
      url_key
      image
      include_in_menu
      children {
        uid
        name
        url_path
        url_key
        image
        include_in_menu
        children {
          uid
          name
          url_path
          url_key
          image
          include_in_menu
          children {
            uid
            name
            url_path
            url_key
            image
            include_in_menu
          }
        }
      }
    }
  }
  }
`
