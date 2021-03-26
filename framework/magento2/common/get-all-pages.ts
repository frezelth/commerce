import { getConfig, Magento2Config } from '../api'
import { CmsPage } from '../schema'
import { getAllPagesQuery } from '../utils/queries'

type Variables = {
  first?: number
}

type ReturnType = {
  pages: Page[]
}

export type Page = {
  id: string
  name: string
  url: string
  sort_order?: number
  body: string
}

const getAllPages = async (options?: {
  variables?: Variables
  config: Magento2Config
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)
  const { locale } = config
  const { data } = await config.fetch(getAllPagesQuery, { variables })

  const pages = data.pages?.edges?.map(({ ...args }: CmsPage) => ({
    ...args,
  }))

  return { pages }
}

export default getAllPages
