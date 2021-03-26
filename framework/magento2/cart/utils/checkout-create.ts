import { MAGENTO2_CHECKOUT_ID_COOKIE, MAGENTO_COOKIE_EXPIRE } from '../../const'

import checkoutCreateMutation from '../../utils/mutations/checkout-create'
import Cookies from 'js-cookie'

export const checkoutCreate = async (fetch: any) => {
  const data = await fetch({
    query: checkoutCreateMutation,
  })

  const checkout = data.checkoutCreate?.checkout
  const checkoutId = checkout?.id

  if (checkoutId) {
    const options = {
      expires: MAGENTO_COOKIE_EXPIRE,
    }
    Cookies.set(MAGENTO2_CHECKOUT_ID_COOKIE, checkoutId, options)
  }

  return checkout
}

export default checkoutCreate
