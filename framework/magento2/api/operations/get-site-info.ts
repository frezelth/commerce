import { OperationContext } from '@commerce/api/operations'
import { Category } from '@commerce/types/site'
import { Magento2Config } from '../index'
import { getCategories, getVendors } from '../../utils'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

export default function getSiteInfoOperation(
  {
    commerce,
  }: OperationContext<any>) {
  async function getSiteInfo({
    query,
    variables,
    config,
  }: {
    query?: string
    variables?: any
    config?: Partial<Magento2Config>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    const cfg = commerce.getConfig(config)
    const categories = await getCategories(cfg)
    const brands = await getVendors(cfg)

    return {
      categories,
      brands,
    }
  }

  return getSiteInfo
}
