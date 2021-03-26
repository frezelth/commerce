import { Magento2Config } from '../api'
import { CategoryTree } from '../schema'
import getSiteCollectionsQuery from './queries/get-all-collections-query'

export type Category = {
  entityId: string
  name: string
  path: string
}

const getCategories = async (config: Magento2Config): Promise<Category[]> => {
  const { data } = await config.fetch(getSiteCollectionsQuery, {
    variables: {
      first: 250,
    },
  })

  return (
    data.categoryList?.map(
      ({ id: entityId, name, url_path }: CategoryTree) => ({
        entityId,
        name,
        path: url_path,
      })
    ) ?? []
  )
}

export default getCategories
