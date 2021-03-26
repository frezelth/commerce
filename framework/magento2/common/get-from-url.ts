import { EntityUrl } from '@framework/schema'
import { getConfig, Magento2Config } from '../api'
import getFromUrlQuery from '../utils/queries/get-from-url-query'

type Variables = {
  url: string
}

const getFromUrl = async (options: {
  variables: Variables
  config: Magento2Config
  preview?: boolean
}): Promise<EntityUrl> => {
  let { config, variables } = options ?? {}

  config = getConfig(config)
  const { locale } = config

  const { data } = await config.fetch(getFromUrlQuery, {
    variables,
  })
  const page = data.urlResolver

  return {
    ...page,
  }
}

export default getFromUrl
