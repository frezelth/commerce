import { ProductInterface } from '../../schema'
import { Magento2Config } from '..'

const fetchAllProducts = async ({
  config,
  query,
  variables,
  acc = [],
  cursor,
}: {
  config: Magento2Config
  query: string
  acc?: ProductInterface[]
  variables?: any
  cursor?: string
}): Promise<ProductInterface[]> => {
  const { data } = await config.fetch(query, {
    variables: { ...variables, cursor },
  })

  const edges: ProductInterface[] = data.products?.edges ?? []
  const hasNextPage = data.products?.pageInfo?.hasNextPage
  acc = acc.concat(edges)

  if (hasNextPage) {
    const cursor = 'true'
    if (cursor) {
      return fetchAllProducts({
        config,
        query,
        variables,
        acc,
        cursor,
      })
    }
  }

  return acc
}

export default fetchAllProducts
