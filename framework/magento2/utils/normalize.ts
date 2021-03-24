import { Product } from '@commerce/types'

import {
  ProductInterface as Magento2Product,
  MediaGalleryInterface,
  ProductImage,
  Money,
  Maybe,
} from '../schema'

/*import type { Cart, LineItem } from '../types'*/

const money = ({ currency, value }: Money) => {
  return {
    value,
    currencyCode: currency,
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

const normalizeProductImages = (o?: Maybe<Maybe<MediaGalleryInterface>[]>) =>
  o?.map(({ ...rest }) => ({
    ...rest,
  }))

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

  const product = {
    id: uid,
    name: name!,
    vendor,
    description: description?.html!,
    path: `/${url_key}.${url_suffix}`,
    slug: url_key!,
    price: money(price_range?.minimum_price?.final_price),
    images: normalizeProductImages(media_gallery),
    variants: [],
    options: [],
    ...rest,
  }

  return product
}

/*export function normalizeCart(checkout: Checkout): Cart {
  return {
    id: checkout.id,
    customerId: '',
    email: '',
    createdAt: checkout.createdAt,
    currency: {
      code: checkout.totalPriceV2?.currencyCode,
    },
    taxesIncluded: checkout.taxesIncluded,
    lineItems: checkout.lineItems?.edges.map(normalizeLineItem),
    lineItemsSubtotalPrice: +checkout.subtotalPriceV2?.amount,
    subtotalPrice: +checkout.subtotalPriceV2?.amount,
    totalPrice: checkout.totalPriceV2?.amount,
    discounts: [],
  }
}

function normalizeLineItem({
  node: { id, title, variant, quantity },
}: CheckoutLineItemEdge): LineItem {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: `${title}`,
    quantity,
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? '',
      name: variant?.title!,
      image: {
        url: variant?.image?.originalSrc,
      },
      requiresShipping: variant?.requiresShipping ?? false,
      price: variant?.priceV2?.amount,
      listPrice: variant?.compareAtPriceV2?.amount,
    },
    path: '',
    discounts: [],
    options: [
      {
        value: variant?.title,
      },
    ],
  }
}*/
