import Cookies from 'js-cookie'
import { MAGENTO2_CHECKOUT_ID_COOKIE } from '../const'

const getCheckoutId = (id?: string) => {
  return id ?? Cookies.get(MAGENTO2_CHECKOUT_ID_COOKIE)
}

export default getCheckoutId
