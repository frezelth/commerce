const customerAccessTokenCreateMutation = /* GraphQL */ `
  mutation generateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      result
    }
  }
`
export default customerAccessTokenCreateMutation
