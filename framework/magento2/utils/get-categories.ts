import {Category} from "@commerce/types/site";
import * as query from "./queries";
import {Magento2Config} from "@framework/api";
import {CategoryTree, Maybe} from "@framework/schema";

const getCategories = async (config: Magento2Config): Promise<Category[]> => {
  const { data } = await config.fetch(query.Categories, {
  })

  return (
    data.categories?.items[0].children?.filter((value: any) => value!.include_in_menu).map(normalizeCategory)
  )
}

function normalizeCategory(category: Maybe<CategoryTree>): Category {
  return {
    id: `${category!.uid}`,
    name: category!.name!,
    slug: category!.url_path!,
    path: category!.url_path!,
    image: category!.image!,
    children: category!.children && category!.children.length > 0 ?
      category!
      .children
      .filter(value => value!.include_in_menu)
      .map(normalizeCategory) : []
  }
}

export default getCategories
