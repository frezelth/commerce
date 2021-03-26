import { GraphQLFetcherResult } from '@commerce/api'
import getFromUrl from '@framework/common/get-from-url'
import { getConfig, Magento2Config } from '../api'
import { normalizeProduct, getProductQuery } from '../utils'

type Variables = {
  slug: string
}

type ReturnType = {
  product: any
}

const getProduct = async (options: {
  variables: Variables
  config: Magento2Config
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  /*const entity = await getFromUrl({variables : {url: variables.slug + ".html"}, config, preview: options.preview})*/

  const { data }: GraphQLFetcherResult = await config.fetch(getProductQuery, {
    variables,
  })

  return data.products?.items?.map(normalizeProduct)[0] ?? null
}

export default getProduct
