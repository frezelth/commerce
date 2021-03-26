import { CategoryTree } from '../schema'
import { getConfig, Magento2Config } from '../api'
import getAllCollectionsQuery from '../utils/queries/get-all-collections-query'

const getAllCollections = async (options?: {
  variables?: any
  config: Magento2Config
  preview?: boolean
}) => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch(getAllCollectionsQuery, { variables })
  const edges = data.categoryList ?? []

  const categories = edges.map(
    ({ id: entityId, name, url_path }: CategoryTree) => ({
      entityId,
      name,
      path: url_path,
    })
  )

  return {
    categories,
  }
}

export default getAllCollections
