import { CmsPage } from '../../schema'
import { Magento2Config, getConfig } from '..'

export type GetPageResult<T extends { page?: any } = { page?: CmsPage }> = T

export type PageVariables = {
  id: string
}

async function getPage({
  url,
  variables,
  config,
  preview,
}: {
  url?: string
  variables: PageVariables
  config?: Magento2Config
  preview?: boolean
}): Promise<GetPageResult> {
  config = getConfig(config)
  return {}
}

export default getPage
