import type { StoreImage } from "@/lib/commerce/types";
import type { IconName } from "@/components/ui/Icon";

const photo = (file: string, width: number, height: number, altText = ""): StoreImage => ({
  url: `/images/${file}.webp`,
  altText,
  width,
  height,
});

export const images = {
  heroTexture: photo("leaf-texture", 1800, 624),
  powderDish: photo(
    "greens-powder-dish",
    1401,
    1401,
    "Fine green powder in a glass dish with a steel spoon",
  ),
  powderDishTall: photo("greens-powder-dish-tall", 800, 1120, "Green powder in a glass dish"),
  scoop: photo("powder-scoop", 1440, 1186, "Green scoop filled with powder"),
  cells: photo("plant-cells", 1406, 1758, "Close-up of green plant cells"),
  field: photo("field", 1800, 1012),
  orchard: photo("orchard", 1800, 1201, "Rows of fruit trees in an orchard"),
  citrus: photo("ingredient-citrus", 800, 1120, "Stacked orange halves"),
};

export const hero = {
  eyebrow: "Daily greens · Subscribe & save 20%",
  lede: "Verdant blends 42 whole-food greens, fruits, roots and minerals into a smooth, lightly sweet drink that supports daily nutrition. Shake it with cold water and get on with your morning.",
  points: ["From $2.13 a serving", "Free Starter Kit", "Skip or cancel anytime"],
};

export const trustItems: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield", title: "Third-party tested", text: "Every batch, for purity & label accuracy" },
  {
    icon: "leaf",
    title: "Nothing artificial",
    text: "No artificial sweeteners, colors or flavors",
  },
  { icon: "truck", title: "Free shipping", text: "On every subscription order" },
  {
    icon: "smile",
    title: "30-day taste promise",
    text: "Don't love it? Your first pouch is on us",
  },
];

export interface RoutineOption {
  handle: string;
  tag: string;
  name: string;
  description: string;
  bullets: string[];
  highlight?: boolean;
}

/** "Three ways to make greens a habit". Prices come from the catalog. */
export const routineOptions: RoutineOption[] = [
  {
    handle: "daily-greens",
    tag: "Most popular",
    name: "Daily Greens Pouch",
    description:
      "30 scoops, stored in your refill canister. The easiest way to make greens a habit.",
    bullets: [
      "42 greens, fruits, roots & minerals",
      "Free Starter Kit with first order",
      "Choose from 3 flavors",
    ],
    highlight: true,
  },
  {
    handle: "travel-sticks",
    tag: "On the go",
    name: "Travel Sticks",
    description: "Pre-measured single servings. Tear, pour, shake, done — anywhere.",
    bullets: ["30 single-serve sticks", "Mix and match flavors", "TSA-friendly, zero mess"],
  },
  {
    handle: "the-daily-pair",
    tag: "Best value",
    name: "The Daily Pair",
    description: "Daily Greens plus Beet & Berry Reds. Green in the morning, red in the afternoon.",
    bullets: [
      "Two full pouches a month",
      "Free Starter Kit + second scoop",
      "Save 27% vs. one-time",
    ],
  },
];

export const scoopFacts = [
  { value: "45", label: "calories per scoop" },
  { value: "1 g", label: "sugar, sweetened with monk fruit" },
  { value: "0", label: "artificial colors or flavors" },
];

export const ingredientTiles = [
  {
    image: photo("ingredient-citrus", 800, 1120),
    title: "Acerola & citrus",
    text: "Bright fruit and natural vitamin C",
  },
  {
    image: photo("ingredient-apple-pear", 800, 1120),
    title: "Apple & pear",
    text: "The crisp base of our Original flavor",
  },
  {
    image: photo("ingredient-cherry-plum", 800, 1120),
    title: "Tart cherry & plum",
    text: "Deep, fruit-forward color and flavor",
  },
  {
    image: photo("ingredient-roots", 800, 1120),
    title: "Licorice & ginger root",
    text: "Warm botanicals that round out the blend",
  },
  {
    image: photo("ingredient-leafy-greens", 640, 800),
    title: "Spinach, kale & spirulina",
    text: "Leafy greens and grasses, dried low & slow",
  },
  {
    image: photo("ingredient-minerals", 800, 1120),
    title: "Minerals",
    text: "Magnesium, zinc and potassium from sea sources",
  },
];

export const subscriptionSteps = [
  {
    title: "Pick your blend & rhythm",
    text: "Choose pouch or sticks, a flavor, and a delivery every 30, 45 or 60 days.",
  },
  {
    title: "Your first box arrives",
    text: "Your blend plus the free Starter Kit: glass shaker, refill canister and scoop.",
  },
  {
    title: "Refills run themselves",
    text: "We text you 3 days before each order. Skip, swap flavors or pause in two taps.",
  },
];

export const reviews = [
  {
    author: "Maya R.",
    location: "Austin, TX",
    title: "Finally a greens drink I look forward to",
    body: "I have tried four other powders and this is the first one I finish every morning without holding my nose. Original tastes like green apple lemonade. Skipping a month when I travelled took two taps.",
  },
  {
    author: "Jordan T.",
    location: "Denver, CO",
    title: "The travel sticks are the move",
    body: "I keep a handful in my backpack and one in the car. Same taste as the pouch, zero mess. Switched my subscription from pouch to sticks in about ten seconds.",
  },
  {
    author: "Priya S.",
    location: "Brooklyn, NY",
    title: "Easy habit, nice packaging",
    body: "The starter kit is genuinely nice, the canister lives on my counter now. Mixes clean in cold water, no clumps. Tart Berry is my favorite.",
  },
  {
    author: "Daniel K.",
    location: "Portland, OR",
    title: "Straightforward subscription",
    body: "No hoops to jump through. I get a reminder text three days before it ships, and I can push it back if I still have some left. That's all I wanted.",
  },
];

export const faqs = [
  {
    question: "What does Verdant taste like?",
    answer:
      "Original is bright and lightly sweet, like green apple with a squeeze of lemon. Mint Lime is cool and zesty, and Tart Berry leans cherry-blackberry. All three are sweetened with a touch of monk fruit, with no artificial sweeteners, colors or flavors.",
  },
  {
    question: "How do I take it?",
    answer:
      "Stir or shake one level scoop (12 g) into 8–10 oz of cold water. Most people have it in the morning, but any time of day works. It also blends well into smoothies.",
  },
  {
    question: "How does Subscribe & Save work?",
    answer:
      "You save 20% on every order, get free shipping, and your first box includes the Starter Kit. Choose a delivery every 30, 45 or 60 days, and skip, swap flavors, change your date or cancel from your account at any time. There are no minimum orders.",
  },
  {
    question: "What if I don't like the taste?",
    answer:
      "Try it for 30 days. If it isn't for you, email us and we'll refund your first pouch, no need to send it back.",
  },
  {
    question: "Is Verdant a replacement for vegetables?",
    answer:
      "No. Verdant supports daily nutrition and is meant to complement a balanced diet, not replace whole foods. If you are pregnant, nursing or taking medication, check with your doctor before adding any supplement.",
  },
  {
    question: "Where do you ship?",
    answer:
      "We ship to all 50 US states. Orders placed before 1 pm PT ship the same business day, and most arrive in 2–4 days.",
  },
];

export const storeRating = { average: 4.8, count: 2146 };
