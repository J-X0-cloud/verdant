import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { BundleSection } from "@/components/shop/BundleSection";
import { ServiceStrip } from "@/components/shop/ServiceStrip";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { ShopChips } from "@/components/shop/ShopChips";
import { StarterKitPromo } from "@/components/shop/StarterKitPromo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { storefront } from "@/lib/commerce";
import { images } from "@/lib/data/home";

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  return (await storefront.getCollections()).map((collection) => ({ handle: collection.handle }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const collection = await storefront.getCollection((await params).handle);
  if (!collection) return {};
  return {
    title: collection.seo.title,
    description: collection.seo.description,
    alternates: { canonical: `/collections/${collection.handle}` },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const [collection, bundles] = await Promise.all([
    storefront.getCollection(handle),
    storefront.getBundles(),
  ]);
  if (!collection) notFound();

  const isAll = handle === "all";
  const cards = Object.fromEntries(
    collection.products.map((product) => [
      product.handle,
      <ProductCard key={product.id} product={product} />,
    ]),
  );
  const photo = images.orchard;

  return (
    <>
      <section className="shop-hero">
        <div className="wrap shop-hero-grid">
          <div>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                ...(isAll
                  ? [{ label: "Shop" }]
                  : [{ label: "Shop", href: "/collections/all" }, { label: collection.title }]),
              ]}
            />
            <h1>{isAll ? "Shop Verdant" : collection.title}</h1>
            <p>{collection.description}</p>
          </div>
          <div className="shop-hero-img">
            <Image
              className="cover"
              src={photo.url}
              alt={photo.altText}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 960px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="sec sec-tight">
        <div className="wrap">
          <ShopBrowser
            products={collection.products}
            cards={cards}
            chips={<ShopChips active={handle} />}
            promo={isAll ? <StarterKitPromo /> : undefined}
          />
        </div>
      </section>

      {isAll ? <BundleSection bundles={bundles} /> : null}
      <ServiceStrip />
    </>
  );
}
