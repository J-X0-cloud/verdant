import { ClosingBand } from "@/components/home/ClosingBand";
import { FaqSection } from "@/components/home/FaqSection";
import { FlavourTiles } from "@/components/home/FlavourTiles";
import { Hero } from "@/components/home/Hero";
import { HomeReviews } from "@/components/home/HomeReviews";
import { HowSubscribing } from "@/components/home/HowSubscribing";
import { IngredientTiles } from "@/components/home/IngredientTiles";
import { InsideTheScoop } from "@/components/home/InsideTheScoop";
import { RoutineCards } from "@/components/home/RoutineCards";
import { TrustRow } from "@/components/home/TrustRow";
import { storefront } from "@/lib/commerce";

export default async function HomePage() {
  const [products, bundles] = await Promise.all([
    storefront.getProducts(),
    storefront.getBundles(),
  ]);
  const greens = products.find((product) => product.handle === "daily-greens")!;
  const greensPricing = greens.variants[0]!.pricing;

  return (
    <>
      <Hero />
      <TrustRow />
      <RoutineCards products={[...products, ...bundles]} />
      <InsideTheScoop />
      <IngredientTiles />
      <HowSubscribing product={greens} />
      <FlavourTiles />
      <HomeReviews />
      <FaqSection />
      <ClosingBand startingPrice={greensPricing.subscription ?? greensPricing.oneTime} />
    </>
  );
}
