import isAllowedMethod from '../utils/is-allowed-method'
import createApiHandler, {
  Magento2ApiHandler,
} from '../utils/create-api-handler'

import {
  MAGENTO2_CHECKOUT_ID_COOKIE,
  MAGENTO2_CHECKOUT_URL_COOKIE,
  MAGENTO2_CUSTOMER_TOKEN_COOKIE,
} from '../../const'

import { getConfig } from '..'
import associateCustomerWithCheckoutMutation from '../../utils/mutations/associate-customer-with-checkout'

const METHODS = ['GET']

const checkoutApi: Magento2ApiHandler<any> = async (req, res, config) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  config = getConfig()

  const { cookies } = req
  const checkoutUrl = cookies[MAGENTO2_CHECKOUT_URL_COOKIE]
  const customerCookie = cookies[MAGENTO2_CUSTOMER_TOKEN_COOKIE]

  if (customerCookie) {
    try {
      await config.fetch(associateCustomerWithCheckoutMutation, {
        variables: {
          checkoutId: cookies[MAGENTO2_CHECKOUT_ID_COOKIE],
          customerAccessToken: cookies[MAGENTO2_CUSTOMER_TOKEN_COOKIE],
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (checkoutUrl) {
    res.redirect(checkoutUrl)
  } else {
    res.redirect('/cart')
  }
}

export default createApiHandler(checkoutApi, {}, {})
