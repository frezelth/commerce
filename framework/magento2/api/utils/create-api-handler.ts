import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { Magento2Config, getConfig } from '..'

export type Magento2ApiHandler<
  T = any,
  H extends Magento2Handlers = {},
  Options extends {} = {}
> = (
  req: NextApiRequest,
  res: NextApiResponse<Magento2ApiResponse<T>>,
  config: Magento2Config,
  handlers: H,
  // Custom configs that may be used by a particular handler
  options: Options
) => void | Promise<void>

export type Magento2Handler<T = any, Body = null> = (options: {
  req: NextApiRequest
  res: NextApiResponse<Magento2ApiResponse<T>>
  config: Magento2Config
  body: Body
}) => void | Promise<void>

export type Magento2Handlers<T = any> = {
  [k: string]: Magento2Handler<T, any>
}

export type Magento2ApiResponse<T> = {
  data: T | null
  errors?: { message: string; code?: string }[]
}

export default function createApiHandler<
  T = any,
  H extends Magento2Handlers = {},
  Options extends {} = {}
>(
  handler: Magento2ApiHandler<T, H, Options>,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    config,
    operations,
    options,
  }: {
    config?: Magento2Config
    operations?: Partial<H>
    options?: Options extends {} ? Partial<Options> : never
  } = {}): NextApiHandler {
    const ops = { ...operations, ...handlers }
    const opts = { ...defaultOptions, ...options }

    return function apiHandler(req, res) {
      return handler(req, res, getConfig(config), ops, opts)
    }
  }
}
