import { FetcherError } from '@commerce/utils/errors'
import type { GraphQLFetcher } from '@commerce/api'
import fetch from './fetch'
import {Magento2Config} from "../index";

const fetchGraphqlApi: (getConfig: () => Magento2Config) => GraphQLFetcher =
  (getConfig) =>
  async (query: string, { variables, preview } = {}, fetchOptions) => {
    // log.warn(query)
    const config = getConfig()
    const res = await fetch(config.commerceUrl + (preview ? '/preview' : ''), {
      ...fetchOptions,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        ...fetchOptions?.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const json = await res.json()
    if (json.errors) {
      throw new FetcherError({
        errors: json.errors ?? [{ message: 'Failed to fetch Magento2 API' }],
        status: res.status,
      })
    }

    return { data: json.data, res }
  }

export default fetchGraphqlApi
