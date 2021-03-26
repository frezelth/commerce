import { Product, Cart as CommerceCart, LineItem } from '@commerce/types'
import { CommerceError } from '@commerce/utils/errors'

import {
  ProductInterface as Magento2Product,
  MediaGalleryInterface,
  Money,
  Maybe,
  Cart,
  CartItemInterface,
} from '../schema'

/*import type { Cart, LineItem } from '../types'*/

const money = ({ currency, value }: Money) => {
  return {
    value: value!,
    retailPrice: value!,
    currencyCode: currency?.toString()!,
  }
}

/*const normalizeProductOption = ({
  id,
  name: displayName,
  values,
}: ProductOption) => {
  return {
    __typename: 'MultipleChoiceOption',
    id,
    displayName,
    values: values.map((value) => {
      let output: any = {
        label: value,
      }
      if (displayName === 'Color') {
        output = {
          ...output,
          hexColors: [value],
        }
      }
      return output
    }),
  }
}*/

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

/*const normalizeProductImages = (o: MediaGalleryInterface[]) =>
  o as ProductImage*/

/*const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges?.map(
    ({
      node: { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 },
    }) => ({
      id,
      name: title,
      sku: sku ?? id,
      price: +priceV2.amount,
      listPrice: +compareAtPriceV2?.amount,
      requiresShipping: true,
      options: selectedOptions.map(({ name, value }: SelectedOption) =>
        normalizeProductOption({
          id,
          name,
          values: [value],
        })
      ),
    })
  )
}*/

export function normalizeProduct(productNode: Magento2Product): Product {
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

export function normalizeCart(checkout: Cart): CommerceCart {
  //const items: CartItemInterface[] = checkout.items!;
  return {
    id: checkout.id,
    customerId: '',
    email: '',
    createdAt: '',
    currency: {
      code: checkout.prices?.grand_total?.currency?.toString()!,
    },
    taxesIncluded: true,
    lineItems: checkout.items?.map(normalizeLineItem)!,
    lineItemsSubtotalPrice: 0,
    subtotalPrice: 0,
    totalPrice: 0,
    discounts: [],
  }
}

function normalizeLineItem(item: Maybe<CartItemInterface>): LineItem {
  return {
    id: item?.uid!,
    variantId: item?.product.uid!,
    productId: item?.product.uid!,
    name: `${item?.product.name}`,
    quantity: item?.quantity!,
    variant: {
      id: item?.product.uid!,
      sku: item?.product.sku ?? '',
      name: item?.product.name!,
      image: {
        url: item?.product.image?.url!,
      },
      requiresShipping: true,
      price: item?.product.price_range.minimum_price.final_price.value!,
      listPrice: item?.product.price_range.minimum_price.final_price.value!,
    },
    path: '',
    discounts: [],
  }
}
