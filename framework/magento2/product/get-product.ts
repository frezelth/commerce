import { GraphQLFetcherResult } from '@commerce/api'
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

  const { data }: GraphQLFetcherResult = await config.fetch(getProductQuery, {
    variables,
  })

  const { productByHandle: product } = data

  return {
    product: product ? normalizeProduct(product) : null,
  }
}

export default getProduct
