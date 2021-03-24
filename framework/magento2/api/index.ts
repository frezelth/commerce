import type { CommerceAPIConfig } from '@commerce/api'

import { API_URL } from '../const'

if (!API_URL) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_MAGENTO2_STORE_DOMAIN is missing and it's required to access your store`
  )
}

import fetchGraphqlApi from './utils/fetch-graphql-api'

export interface Magento2Config extends CommerceAPIConfig {}

export class Config {
  private config: Magento2Config

  constructor(config: Magento2Config) {
    this.config = config
  }

  getConfig(userConfig: Partial<Magento2Config> = {}) {
    return Object.entries(userConfig).reduce<Magento2Config>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<Magento2Config>) {
    Object.assign(this.config, newConfig)
  }
}

const config = new Config({
  locale: 'fr-FR',
  commerceUrl: API_URL,
  apiToken: 'NO_NEED'!,
  cartCookie: 'NO_NEED'!,
  cartCookieMaxAge: 60,
  fetch: fetchGraphqlApi,
  customerCookie: 'NO_NEED',
})

export function getConfig(userConfig?: Partial<Magento2Config>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<Magento2Config>) {
  return config.setConfig(newConfig)
}
