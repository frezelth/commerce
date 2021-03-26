import { Product } from '@commerce/types'
import { getConfig, Magento2Config } from '../api'
import fetchAllProducts from '../api/utils/fetch-all-products'
import { ProductInterface } from '../schema'
import getAllProductsPathsQuery from '../utils/queries/get-all-products-paths-query'

type ProductPath = {
  path: string
}

export type ProductPathNode = {
  node: ProductPath
}

type ReturnType = {
  products: ProductPathNode[]
}

const getAllProductPaths = async (options?: {
  variables?: any
  config?: Magento2Config
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { pageSize: 250 } } = options ?? {}
  config = getConfig(config)

  const products = await fetchAllProducts({
    config,
    query: getAllProductsPathsQuery,
    variables,
  })

  return {
    products: products?.map(({ url_key: url }: ProductInterface) => ({
      node: {
        path: url!,
      },
    })),
  }
}

export default getAllProductPaths
