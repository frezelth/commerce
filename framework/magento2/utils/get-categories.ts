import {Category} from "@commerce/types/site";
import * as query from "./queries";
import {Magento2Config} from "@framework/api";
import {normalizeCategory} from "@framework/utils/normalize";

const getCategories = async (config: Magento2Config): Promise<Category[]> => {
  const { data } = await config.fetch(query.Categories, {
  })

  return (
    data.categories?.items[0].children?.filter((value: any) => value!.include_in_menu).map(normalizeCategory)
  )
}

export default getCategories
