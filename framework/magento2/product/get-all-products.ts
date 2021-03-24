import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, Magento2Config } from '../api'
import { getAllProductsQuery } from '../utils/queries'
import { normalizeProduct } from '../utils/normalize'
import { Product } from '@commerce/types'

type Variables = {
  first?: number
  field?: string
}

type ReturnType = {
  products: Product[]
}

const getAllProducts = async (options: {
  variables?: Variables
  config?: Magento2Config
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(
    getAllProductsQuery,
    { variables }
  )

  const products = data.products?.items?.map(normalizeProduct) ?? []

  return {
    products,
  }
}

export default getAllProducts
