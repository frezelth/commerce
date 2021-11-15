import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import Image from 'next/image'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import styles from '../styles/Home.module.css'

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
  // const { products } = await productsPromise
  const products = {}
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
