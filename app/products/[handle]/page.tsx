import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { FormatCompare } from "@/components/product/FormatCompare";
import { IngredientPanel } from "@/components/product/IngredientPanel";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductJsonLd } from "@/components/product/ProductJsonLd";
import { ProductRail } from "@/components/product/ProductRail";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductView } from "@/components/product/ProductView";
import { SubscribePerks } from "@/components/product/SubscribePerks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { storefront } from "@/lib/commerce";
import { defaultVariant, findVariantByFlavour, isSubscribable } from "@/lib/commerce/catalog";
import { images, reviews } from "@/lib/data/home";
import { formatComparison } from "@/lib/data/product-content";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ flavor?: string | string[] }>;
}

export async function generateStaticParams() {
  return (await storefront.getProducts()).map((product) => ({ handle: product.handle }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await storefront.getProduct((await params).handle);
  if (!product) return {};
  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: `/products/${product.handle}` },
  };
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const [{ handle }, { flavor }] = await Promise.all([params, searchParams]);
  const product = await storefront.getProduct(handle);
  if (!product) notFound();
  // Bundles are merchandised on the shop page rather than on their own PDP.
  if (product.category === "bundles") redirect(`/collections/all#${product.handle}`);

  const variant =
    findVariantByFlavour(product, Array.isArray(flavor) ? flavor[0] : flavor) ??
    defaultVariant(product);
  const subscribable = isSubscribable(product);
  const isGreens = product.category === "greens" && subscribable;

  const [recommendations, formats] = await Promise.all([
    storefront.getRecommendations(product.handle, 4),
    Promise.all(formatComparison.columns.map((h) => storefront.getProduct(h))),
  ]);

  return (
    <>
      <ProductJsonLd product={product} />
      <Breadcrumbs
        className="wrap"
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/collections/all" },
          { label: product.shortTitle },
        ]}
      />
      <ProductView
        key={product.handle}
        product={product}
        initialVariantId={variant.id}
        photos={isGreens ? [images.powderDishTall, images.scoop, images.citrus] : []}
        details={<ProductDetails product={product} subscribable={subscribable} />}
      />

      {subscribable ? <SubscribePerks /> : null}
      {product.ingredients ? <IngredientPanel ingredients={product.ingredients} /> : null}
      {isGreens ? <FormatCompare formats={formats.filter((p) => p !== undefined)} /> : null}
      {isGreens ? <ProductReviews product={product} reviews={reviews} /> : null}
      <ProductRail
        eyebrow="Pairs well with"
        title="Complete the routine"
        products={recommendations}
        link={{ href: "/collections/all", label: "Shop everything" }}
      />
    </>
  );
}
