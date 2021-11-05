import {getSearchStaticProps} from '@lib/search-props'
import type {GetStaticPropsContext} from 'next'
import Search from '@components/search'
import commerce from "@lib/api/commerce";
import {Category} from "@commerce/types/site";
import {InferGetStaticPropsType} from "next";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
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

  const paths = flat.map(obj => ({params: { path: obj.path.split("/")}}))

  console.log(paths)

  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({
                                       preview,
                                       locale,
                                       locales,
                                     }: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
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
    <>
      <div className="hidden md:block">
        <Image src="/images/home/home_banner_202110.jpg" width={2480} height={1470}/>
      </div>
      <div className={'block md:hidden ' + styles.banner}>
        <div className="absolute left-0 top-0">
          <Image src="/images/home/home_mobile_homme_202110_1.jpg" width={1103} height={1470}/>
        </div>
        <div className="absolute left-0 top-0">
          <Image className={styles.image2} src="/images/home/home_mobile_homme_202110_2.jpg" width={1103} height={1470}/>
        </div>
      </div>
    </>
  )
}

Home.Layout = Layout
