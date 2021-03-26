import { ProductInterface } from '../../schema'
import { Magento2Config } from '..'

const fetchAllProducts = async ({
  config,
  query,
  variables,
  acc = [],
  currentPage,
}: {
  config: Magento2Config
  query: string
  acc?: ProductInterface[]
  variables?: any
  currentPage?: number
}): Promise<ProductInterface[]> => {
  const { data } = await config.fetch(query, {
    variables: { ...variables, currentPage },
  })

  const items: ProductInterface[] = data.items ?? []
  const hasNextPage = data.page_info?.current_page < data.page_info?.total_pages
  acc = acc.concat(items)

  if (hasNextPage) {
    const nextPage = currentPage ?? 0
    return fetchAllProducts({
      config,
      query,
      variables,
      acc,
      currentPage: nextPage,
    })
  }

  return acc
}

export default fetchAllProducts
