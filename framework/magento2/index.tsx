import { getCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'
import { magentoProvider, MagentoProvider } from './provider'

export { magentoProvider }
export type { MagentoProvider }

export const CommerceProvider = getCommerceProvider(magentoProvider)

export const useCommerce = () => useCoreCommerce<MagentoProvider>()
