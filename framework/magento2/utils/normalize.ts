import {
  CategoryTree,
  Maybe,
  MediaGalleryInterface,
  Money,
  ProductInterface
} from "@framework/schema";
import {Product} from "@commerce/types/product";
import {Category} from "@commerce/types/site";
import {CommerceError} from "@commerce/utils/errors";

const money = ({ currency, value }: Money) => {
  return {
    value: value!,
    retailPrice: value!,
    currencyCode: currency?.toString()!,
  }
}

const buildImage = (img: MediaGalleryInterface | null) => {
  return {
    url: img?.url!,
  }
}

const normalizeProductImages = (
  o?: Maybe<Array<Maybe<MediaGalleryInterface>>>
) => {
  if (!o) {
    throw new CommerceError({
      message: 'Invalid response from Magento',
    })
  }
  const img = o
  return img?.map(buildImage)
}

export function normalizeProduct(productNode: ProductInterface): Product {
  const {
    uid,
    name,
    manufacturer: vendor,
    media_gallery,
    description,
    url_key,
    price_range,
    url_suffix,
    ...rest
  } = productNode

  const gallery = media_gallery!
  const gal = gallery!

  const product = {
    id: uid,
    name: name!,
    vendor,
    description: description?.html!,
    path: `/${url_key}.${url_suffix}`,
    slug: url_key!,
    price: money(price_range?.minimum_price?.final_price),
    images: normalizeProductImages(media_gallery!),
    variants: [],
    options: [],
  }

  return product
}

export function normalizeCategory(category: Maybe<CategoryTree>): Category {
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
