import type {
  ArtSpec,
  FlavourId,
  Product,
  ProductVariant,
  VariantPricing,
} from "@/lib/commerce/types";
import { STARTER_KIT, subscribeAndSave, usd } from "@/lib/subscriptions";
import { flavours, greensFlavours } from "./flavours";

function flavourVariants(
  handle: string,
  sku: string,
  ids: FlavourId[],
  pricing: VariantPricing,
): ProductVariant[] {
  return ids.map((id) => ({
    id: `${handle}--${id}`,
    title: flavours[id].name,
    flavour: id,
    sku: `VD-${sku}-${id.slice(0, 3).toUpperCase()}`,
    pricing,
    available: true,
  }));
}

function singleVariant(
  handle: string,
  sku: string,
  pricing: VariantPricing,
  title = "Default",
): ProductVariant[] {
  return [{ id: `${handle}--default`, title, sku: `VD-${sku}`, pricing, available: true }];
}

const greensSticks: ArtSpec = {
  type: "group",
  layout: "duo",
  items: [
    { type: "stick", flavour: "original" },
    { type: "stick", flavour: "mint" },
    { type: "stick", flavour: "berry" },
  ],
};

const redsPouch: ArtSpec = {
  type: "pouch",
  title: "Beet & Berry Reds",
  caption: "30 servings · 7.4 oz (210 g)",
  flavour: "reds",
};

const proteinPouch: ArtSpec = {
  type: "pouch",
  title: "Plant Protein",
  caption: "20 servings · 1.3 lb (600 g)",
  flavour: "protein",
};

const HOW_TO_TAKE =
  "Add one level scoop (12 g) to 8–10 oz of cold water, shake for 10 seconds and drink. Many subscribers take it first thing in the morning; it also blends well into smoothies. Use within 60 days of opening and store in a cool, dry place.";

const GREENS_INGREDIENTS: Product["ingredients"] = {
  caption:
    "Per scoop (12 g) · 45 calories · 6 g carbohydrate · 2 g fiber · 1 g sugar · 2 g protein",
  groups: [
    {
      name: "Leafy greens & grasses",
      grams: "4.6 g",
      ingredients:
        "Organic spinach, kale, wheatgrass, barley grass, spirulina, chlorella, broccoli, parsley, moringa",
    },
    {
      name: "Fruits & berries",
      grams: "3.4 g",
      ingredients: "Apple, acerola cherry, lemon, pineapple, tart cherry, blueberry, pear, goji",
    },
    {
      name: "Roots & botanicals",
      grams: "1.9 g",
      ingredients: "Beet root, carrot, ginger, licorice root, dandelion, burdock, turmeric",
    },
    {
      name: "Fiber & plant blend",
      grams: "1.6 g",
      ingredients: "Inulin, apple pectin, flaxseed, oat fiber, chia",
    },
    {
      name: "Vitamins & minerals",
      grams: "0.5 g",
      ingredients: "Vitamin C, vitamin E, folate, B12, magnesium, zinc, potassium, selenium",
    },
  ],
};

const GREENS_REVIEWS = {
  average: 4.8,
  count: 2146,
  distribution: [86, 10, 3, 1, 0],
} satisfies Product["reviews"];

export const products: Product[] = [
  {
    id: "prod_daily_greens",
    handle: "daily-greens",
    title: "Daily Greens Pouch",
    shortTitle: "Daily Greens",
    category: "greens",
    blurb: "Our everyday blend of 42 greens, fruits, roots and minerals. 30 scoops.",
    description:
      "42 whole-food greens, fruits, roots and minerals in one smooth, lightly sweet scoop that supports daily nutrition. 30 servings per pouch.",
    badge: "Best seller",
    servings: 30,
    packSize: "30 servings · 13.3 oz (378 g)",
    art: { type: "pouch" },
    variants: flavourVariants("daily-greens", "DG30", greensFlavours, subscribeAndSave(80)),
    howToTake: HOW_TO_TAKE,
    ingredients: GREENS_INGREDIENTS,
    reviews: GREENS_REVIEWS,
    seo: {
      title: "Daily Greens Powder — Subscribe & Save",
      description:
        "Verdant Daily Greens: 42 greens, fruits, roots and minerals in one smooth scoop. Subscribe & save 20% with free shipping and a free Starter Kit.",
    },
  },
  {
    id: "prod_travel_sticks",
    handle: "travel-sticks",
    title: "Daily Greens Travel Sticks",
    shortTitle: "Travel Sticks",
    category: "greens",
    blurb: "The same blend in 30 single-serve sticks for desks, gym bags and carry-ons.",
    description:
      "The full Daily Greens blend in 30 pre-measured single-serve sticks. Tear, pour, shake, done — anywhere.",
    badge: "Subscriber favorite",
    servings: 30,
    packSize: "30 sticks · 12 g each",
    art: greensSticks,
    variants: flavourVariants("travel-sticks", "TS30", greensFlavours, subscribeAndSave(90)),
    howToTake:
      "Tear open one stick, pour into 8–10 oz of cold water and shake for 10 seconds. Sticks are TSA-friendly and keep for 18 months unopened.",
    ingredients: GREENS_INGREDIENTS,
    reviews: GREENS_REVIEWS,
    seo: {
      title: "Daily Greens Travel Sticks",
      description:
        "Verdant Daily Greens in 30 single-serve travel sticks. Subscribe & save 20% with free shipping and a free Starter Kit.",
    },
  },
  {
    id: "prod_reds",
    handle: "beet-berry-reds",
    title: "Beet & Berry Reds",
    shortTitle: "Beet & Berry Reds",
    category: "pairs",
    blurb: "A bright, fruit-forward companion blend of beet, tart cherry and hibiscus.",
    description:
      "A bright, fruit-forward companion to Daily Greens with beet root, tart cherry and hibiscus. Green in the morning, red in the afternoon.",
    badge: "New",
    servings: 30,
    packSize: "30 servings · 7.4 oz (210 g)",
    art: redsPouch,
    variants: flavourVariants("beet-berry-reds", "RD30", ["reds"], subscribeAndSave(55)),
    howToTake: "Stir one scoop (7 g) into 8 oz of cold water or sparkling water, any time of day.",
    reviews: { average: 4.7, count: 318 },
    seo: {
      title: "Beet & Berry Reds",
      description:
        "Verdant Beet & Berry Reds: a fruit-forward blend of beet, tart cherry and hibiscus. Subscribe & save 20%.",
    },
  },
  {
    id: "prod_protein",
    handle: "plant-protein",
    title: "Plant Protein",
    shortTitle: "Plant Protein",
    category: "pairs",
    blurb: "20 g of pea and rice protein per scoop. Stirs smooth into your greens.",
    description:
      "20 g of pea and rice protein per scoop in a soft vanilla-oat flavor that stirs smooth into water, milk or your daily greens.",
    servings: 20,
    packSize: "20 servings · 1.3 lb (600 g)",
    art: proteinPouch,
    variants: flavourVariants("plant-protein", "PP20", ["protein"], subscribeAndSave(60)),
    howToTake: "Shake one scoop (30 g) with 10–12 oz of water or milk, or add it to your greens.",
    reviews: { average: 4.6, count: 204 },
    seo: {
      title: "Plant Protein",
      description:
        "Verdant Plant Protein: 20 g of pea and rice protein per scoop. Subscribe & save 20%.",
    },
  },
  {
    id: "prod_minerals",
    handle: "daily-minerals",
    title: "Daily Minerals Stick Pack",
    shortTitle: "Daily Minerals",
    category: "pairs",
    blurb: "Light electrolyte mix for hot days and long runs. 20 sticks.",
    description:
      "A light electrolyte mix with sodium, potassium and magnesium for hot days, long runs and long flights.",
    servings: 20,
    packSize: "20 sticks",
    art: {
      type: "group",
      layout: "duo",
      items: [
        { type: "stick", flavour: "minerals", label: "Daily Minerals" },
        { type: "stick", flavour: "minerals", label: "Daily Minerals" },
      ],
    },
    variants: flavourVariants("daily-minerals", "MN20", ["minerals"], subscribeAndSave(35)),
    howToTake: "Pour one stick into 16 oz of water. Up to two sticks a day.",
    reviews: { average: 4.7, count: 142 },
    seo: {
      title: "Daily Minerals Stick Pack",
      description:
        "Verdant Daily Minerals: a light electrolyte mix in 20 travel sticks. Subscribe & save 20%.",
    },
  },
  {
    id: "prod_trial",
    handle: "travel-sticks-7-pack",
    title: "Travel Sticks · 7 pack",
    shortTitle: "Travel Sticks · 7 pack",
    category: "greens",
    blurb: "A week of Daily Greens to try every flavor before you subscribe.",
    description:
      "Seven single-serve sticks across all three Daily Greens flavors: a week to find your favorite before you subscribe.",
    badge: "Try it",
    servings: 7,
    packSize: "7 sticks",
    art: {
      type: "group",
      layout: "duo",
      items: [
        { type: "stick", flavour: "berry" },
        { type: "stick", flavour: "original" },
      ],
    },
    variants: singleVariant(
      "travel-sticks-7-pack",
      "TS07",
      { oneTime: usd(22) },
      "Tart Berry & Mint Lime",
    ),
    reviews: { average: 4.8, count: 389 },
    seo: {
      title: "Travel Sticks Trial 7 Pack",
      description: "Try every Verdant Daily Greens flavor with a 7-pack of travel sticks.",
    },
  },
  {
    id: "prod_shaker",
    handle: "glass-shaker",
    title: "Glass Shaker",
    shortTitle: "Glass Shaker",
    category: "accessories",
    blurb: "16 oz borosilicate glass with a leak-proof lid. Dishwasher safe.",
    description:
      "A 16 oz borosilicate glass shaker with a leak-proof lid and printed measure lines.",
    art: { type: "shaker" },
    variants: singleVariant("glass-shaker", "ACC-SHK", { oneTime: usd(18) }),
    reviews: { average: 4.8, count: 96 },
    seo: {
      title: "Glass Shaker",
      description: "Verdant 16 oz glass shaker with a leak-proof lid.",
    },
  },
  {
    id: "prod_canister",
    handle: "refill-canister",
    title: "Refill Canister",
    shortTitle: "Refill Canister",
    category: "accessories",
    blurb: "Airtight countertop canister that holds one full pouch.",
    description: "An airtight countertop canister that holds one full pouch of Daily Greens.",
    art: { type: "canister" },
    variants: singleVariant("refill-canister", "ACC-CAN", { oneTime: usd(24) }),
    reviews: { average: 4.9, count: 71 },
    seo: {
      title: "Refill Canister",
      description: "Verdant airtight refill canister for Daily Greens.",
    },
  },
  {
    id: "prod_scoop",
    handle: "stainless-scoop",
    title: "Stainless Scoop",
    shortTitle: "Stainless Scoop",
    category: "accessories",
    blurb: "A replacement 12 g measuring scoop in brushed steel.",
    description: "A replacement 12 g measuring scoop in brushed stainless steel.",
    art: { type: "scoop" },
    variants: singleVariant("stainless-scoop", "ACC-SCP", { oneTime: usd(9) }),
    reviews: { average: 4.7, count: 38 },
    seo: { title: "Stainless Scoop", description: "Verdant 12 g stainless steel measuring scoop." },
  },
  {
    id: "prod_gift_card",
    handle: "gift-card",
    title: "Digital Gift Card",
    shortTitle: "Gift Card",
    category: "accessories",
    blurb: "Send a month of greens by email, from $25 to $200.",
    description: "Send a month of greens by email. Delivered instantly or on the date you choose.",
    badge: "Gift",
    art: { type: "giftcard" },
    variants: [25, 50, 75, 100, 200].map((amount) => ({
      id: `gift-card--${amount}`,
      title: `$${amount}`,
      sku: `VD-GC-${amount}`,
      pricing: { oneTime: usd(amount) },
      available: true,
    })),
    reviews: { average: 4.9, count: 54 },
    seo: {
      title: "Digital Gift Card",
      description: "Give Verdant: digital gift cards from $25 to $200.",
    },
  },
];

export const bundles: Product[] = [
  {
    id: "prod_bundle_daily_pair",
    handle: "the-daily-pair",
    title: "The Daily Pair",
    shortTitle: "The Daily Pair",
    category: "bundles",
    blurb: "Daily Greens + Beet & Berry Reds",
    description: "Daily Greens plus Beet & Berry Reds. Green in the morning, red in the afternoon.",
    badge: "Best value",
    servings: 60,
    art: {
      type: "group",
      layout: "pair",
      items: [{ type: "pouch", flavour: "original" }, redsPouch],
    },
    variants: singleVariant("the-daily-pair", "BN-PAIR", {
      oneTime: usd(135),
      subscription: usd(98),
    }),
    subscriptionOnly: true,
    bundle: {
      components: ["daily-greens", "beet-berry-reds"],
      perks: [
        "Two full pouches a month",
        "Free Starter Kit + second scoop",
        "Save 27% vs. one-time",
      ],
    },
    reviews: { average: 4.8, count: 412 },
    seo: {
      title: "The Daily Pair",
      description: "Daily Greens and Beet & Berry Reds in one subscription. Save 27% vs. one-time.",
    },
  },
  {
    id: "prod_bundle_greens_protein",
    handle: "greens-protein",
    title: "Greens + Protein",
    shortTitle: "Greens + Protein",
    category: "bundles",
    blurb: "Daily Greens + Plant Protein",
    description: "Daily Greens and Plant Protein on one delivery date.",
    art: {
      type: "group",
      layout: "pair",
      items: [{ type: "pouch", flavour: "mint" }, proteinPouch],
    },
    variants: singleVariant("greens-protein", "BN-GP", {
      oneTime: usd(140),
      subscription: usd(102),
    }),
    subscriptionOnly: true,
    bundle: { components: ["daily-greens", "plant-protein"], perks: [] },
    reviews: { average: 4.7, count: 128 },
    seo: {
      title: "Greens + Protein",
      description: "Daily Greens and Plant Protein in one subscription.",
    },
  },
  {
    id: "prod_bundle_travel_set",
    handle: "the-travel-set",
    title: "The Travel Set",
    shortTitle: "The Travel Set",
    category: "bundles",
    blurb: "30 Travel Sticks + Glass Shaker + 7-pack for a friend",
    description: "30 Travel Sticks, a Glass Shaker and a 7-pack to share.",
    badge: "Giftable",
    art: {
      type: "group",
      layout: "pair-sm",
      items: [
        { type: "stick", flavour: "original" },
        { type: "shaker" },
        { type: "stick", flavour: "berry" },
      ],
    },
    variants: singleVariant("the-travel-set", "BN-TRV", {
      oneTime: usd(130),
      subscription: usd(86),
    }),
    subscriptionOnly: true,
    bundle: { components: ["travel-sticks", "glass-shaker", "travel-sticks-7-pack"], perks: [] },
    reviews: { average: 4.8, count: 87 },
    seo: {
      title: "The Travel Set",
      description: "Travel Sticks, a Glass Shaker and a 7-pack to share.",
    },
  },
];

/** Added automatically to the first subscription order. Not sold on its own. */
export const starterKit: Product = {
  id: "prod_starter_kit",
  handle: STARTER_KIT.handle,
  title: "Starter Kit",
  shortTitle: "Starter Kit",
  category: "accessories",
  blurb: "Glass shaker, canister & scoop",
  description:
    "A 16 oz glass shaker with a leak-proof lid, an airtight refill canister that holds one pouch, and a stainless steel scoop.",
  art: { type: "group", layout: "kit-sm", items: [{ type: "canister" }, { type: "shaker" }] },
  variants: [
    {
      id: STARTER_KIT.variantId,
      title: "Glass shaker, canister & scoop",
      sku: "VD-KIT",
      pricing: { oneTime: usd(STARTER_KIT.value) },
      available: true,
    },
  ],
  reviews: { average: 4.9, count: 611 },
  seo: { title: "Starter Kit", description: "Free with your first Verdant subscription." },
};
