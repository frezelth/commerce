import {Magento2Config} from "@framework/api";
import {normalizeProduct} from "@framework/utils/normalize";
import {Product} from "@commerce/types/product";

const getProducts = async (
  query: string,
  variables: any,
  config: Magento2Config): Promise<Product[]> => {
  const { data } = await config.fetch(query, {
    variables
  })

  return data.products?.items?.map(normalizeProduct) ?? []
}

export default getProducts
