import {Category} from "@commerce/types/site";
import * as query from "./queries";
import {Magento2Config} from "@framework/api";
import {normalizeCategory} from "@framework/utils/normalize";

const getCategory = async (
  config: Magento2Config,
  variables: any
  ): Promise<Category[]> => {
  const { data } = await config.fetch(query.CategoryList, {
    variables
  })

  return (
    data.categoryList.items[0].map(normalizeCategory)
  )
}

export default getCategory
