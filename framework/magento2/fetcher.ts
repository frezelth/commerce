import { Fetcher } from '@commerce/utils/types'
import { API_URL } from './const'
import { handleFetchResponse } from './utils'

const fetcher: Fetcher = async ({ method = 'POST', variables, query }) => {
  return handleFetchResponse(
    await fetch(API_URL, {
      method,
      body: JSON.stringify({ query, variables }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  )
}

export default fetcher
