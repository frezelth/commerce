import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useCustomer from '../customer/use-customer'
import createCustomerAccessTokenMutation from '../utils/mutations/customer-access-token-create'
import { Mutation, MutationGenerateCustomerTokenArgs } from '../schema'
import useLogin, { UseLogin } from '@commerce/auth/use-login'
import { setCustomerToken } from '../utils'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<
  null,
  {},
  MutationGenerateCustomerTokenArgs
> = {
  fetchOptions: {
    query: createCustomerAccessTokenMutation,
  },
  async fetcher({ input: { email, password }, options, fetch }) {
    if (!(email && password)) {
      throw new CommerceError({
        message: 'An email and password are required to login',
      })
    }

    const { generateCustomerToken } = await fetch<
      Mutation,
      MutationGenerateCustomerTokenArgs
    >({
      ...options,
      variables: {
        input: { email, password },
      },
    })

    const accessToken = generateCustomerToken?.token

    if (accessToken) {
      setCustomerToken(accessToken)
    }

    return null
  },
  useHook: ({ fetch }) => () => {
    const { revalidate } = useCustomer()

    return useCallback(
      async function login(input) {
        const data = await fetch({ input })
        await revalidate()
        return data
      },
      [fetch, revalidate]
    )
  },
}
