import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Image from "next/image";

export async function getStaticProps({
                                       preview,
                                       locale,
                                       locales,
                                     }: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      categories,
    },
    revalidate: 60,
  }
}

export default function APropos({
                             }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1>Qui sommes-nous ?</h1>
      <div className="about">
        <section><Image src="/images/about/banner_about.png" width={1240} height={500}/></section>
        <section className="uj-centered uj-small">
          <h2>Notre philosophie</h2>
          <p>UJOO a pour ambition de vous proposer des sélections uniques de pièces de créateurs
            et de marques indépendantes sud-coréennes. En effet, la plupart d’entre eux sont
            distribués uniquement dans des showrooms physiques à Séoul et demeurent méconnus,
            voire inconnus du public européen.<br/>Notre volonté est de vous faire découvrir ces
            créateurs et ces designers, leurs univers riches, leurs tendances, mais aussi leur
            culture.<br/>Comment ?<br/>En faisant vivre et rayonner ces marques sur UJOO, en leur
            apportant un espace d’expression à la hauteur de leur talent et de leur
            créativité.</p>
          <p>Notre e-shop est avant tout une invitation à la découverte et au voyage, une fenêtre
            sur le monde permettant d’accéder à un univers et à une expérience unique...<br/>UJOO a
            particulièrement à cœur de vous présenter cette facette si singulière de la culture
            coréenne : la mode.<br/>Avant-gardiste, tendance, et empreinte de modernité, nous
            sommes persuadés que la mode coréenne a beaucoup à offrir aux petits frenchies !
          </p>
        </section>
        <section className="uj-centered"></section>
        <section className="uj-centered uj-flex twodiv">
          <div></div>
          <div>
            <h2>La mode coréenne à portée de main !</h2>
            <p>Bien plus qu’une simple place de marché, UJOO est avant tout une plateforme
              engagée, désireuse de faire rayonner et de valoriser le savoir-faire des créateurs
              et des marques indépendantes coréennes. Sélectionnées avec soin, toutes les pièces
              proposées sont disponibles en petites quantités.<br/>Comment sont sélectionnés les
              marques et créateurs ?<br/>UJOO promeut avant tout la singularité des collections,
              l’authenticité des matières, le sens du détail...<br/>Sur cet e-shop, vous
              prendrez plaisir à découvrir des pièces minimalistes non genrées, des coupes
              oversize, des couleurs tendres... Des collections façonnées avec singularité,
              à destination d’un public qui attend quelque chose de "différent".</p>
            <p>À travers UJOO, c’est tout un univers qui s’offre à vous. Chaque création proposée
              a une âme, un caractère, une culture, une histoire...<br/>Ici les genres se
              mélangent, la tradition se mêle à la modernité et le confort et la qualité
              priment. UJOO, c’est aussi une histoire d’émotions, de coups de cœur et de
              partage...<br/>Ainsi, les nouveautés afflueront tout au long de l’année pour vous
              permettre d’aller plus loin dans cette découverte et pour continuer à vous faire
              voyager.</p>
          </div>
        </section>
        <section className="uj-centered uj-small uj-flex"><a href="/homme.html"></a>
        </section>
        <section className="uj-centered uj-small">
          <h2>Un concept-store engagé et à l’écoute</h2>
          <p>UJOO s’engage dans une relation de confiance avec chacune de ses marques partenaires,
            mais UJOO s’engage également auprès de ses clients. Ainsi, lorsque vous passez
            commande, le produit est déjà dans nos locaux !<br/>Pourquoi ce choix ?<br/>Pour
            permettre aux marques indépendantes de se concentrer sur la préparation de leurs
            collections, et pour nous permettre de vérifier que chaque produit est absolument
            parfait avant de vous l’envoyer !<br/>Mais de cette façon, UJOO s’engage également
            pour la planète. Toutes les pièces sont stockées dans nos locaux en France afin
            d’éviter les livraisons en petites quantités et la multiplication des émissions de
            gaz à effet de serre.</p>
          <p>UJOO souhaite se développer et grandir à vos côtés, c’est pourquoi, UJOO est aussi un
            concept-store à l’écoute.<br/>Conscient que sans vous, UJOO n’existe pas, nous désirons
            placer nos clients au centre de notre stratégie.<br/>Comment ?<br/>En prenant en
            compte vos désirs et vos envies afin de mettre en avant des marques indépendantes
            et des créateurs que vous aimeriez découvrir sur UJOO... N’hésitez pas à réagir et
            à nous faire partager vos idées !</p>
        </section>
      </div>
    </>
  )
}

APropos.Layout = Layout
