import {Category} from "@commerce/types/site";
import * as query from "./queries";
import {CollectionCountableEdge} from "../../saleor/schema";
import {Magento2Config} from "@framework/api";

const getCategories = async (config: Magento2Config): Promise<Category[]> => {
  const { data } = await config.fetch(query.Categories, {
  })

  return (
    data.categories?.items?.map(({ node: { id, name, slug } }: CollectionCountableEdge) => ({
      id,
      name,
      slug,
      path: `/${slug}`,
    })) ?? []
  )
}

export default getCategories
