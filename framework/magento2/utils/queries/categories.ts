export const Categories = /* GraphQL */ `
  query Categories {
  categories {
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
