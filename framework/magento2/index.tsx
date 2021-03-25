import * as React from 'react'
import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { magento2Provider, Magento2Provider } from './provider'
import { MAGENTO2_CHECKOUT_ID_COOKIE } from './const'

export { magento2Provider }
export type { Magento2Provider }

export const magento2Config: CommerceConfig = {
  locale: 'en-us',
  cartCookie: MAGENTO2_CHECKOUT_ID_COOKIE,
}

export type Magento2Config = Partial<CommerceConfig>

export type Magento2Props = {
  children?: ReactNode
  locale: string
} & Magento2Config

export function CommerceProvider({ children, ...config }: Magento2Props) {
  return (
    <CoreCommerceProvider
      // TODO: Fix this type
      provider={magento2Provider as any}
      config={{ ...magento2Config, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
