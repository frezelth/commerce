import { Product } from '@commerce/types/product'
import { GetAllProductsOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import type { Magento2Config, Provider } from '../index'
import data from '../../data.json'
import {Products} from "@framework/utils/queries";
import * as query from "@framework/utils/queries";
import {getCategories} from "@framework/utils";
import getProducts from "@framework/utils/get-products";

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = Products,
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<Magento2Config>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    const cfg = commerce.getConfig(config)
    const p = await getProducts(query, variables, cfg)
    return { products: p }
  }
  return getAllProducts
}
