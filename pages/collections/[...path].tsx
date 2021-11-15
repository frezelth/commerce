import type {GetStaticPropsContext} from 'next'
import {InferGetStaticPropsType} from "next";
import commerce from "@lib/api/commerce";
import {Layout} from "@components/common";

const flatten = (data: any[]) => {
  return data.reduce((r, { children, ...rest}) => {
    r.push(rest);
    if (children) r.push(...flatten(children));
    return r;
  }, [])
}

export const getStaticPaths = async () => {
  const { categories, vendors } = await commerce.getSiteInfo({}, false)
  const flat = flatten(categories)
  const paths = flat.map((obj : any) => ({params: { path: obj.path.split("/")}}))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({
                                       preview,
                                       params,
                                       locale,
                                       locales,
                                     }: GetStaticPropsContext) {
  const config = { locale, locales }

  // find category id from path

  const productsPromise = commerce.getAllProducts({
    variables: { categoryFilter: 6 },
    config,
    preview,
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
                               products,
                             }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product : any) => (
            <a key={product.id} href={product.href} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

Home.Layout = Layout
