import type { Flavour, FlavourId } from "@/lib/commerce/types";

export const flavours: Record<FlavourId, Flavour> = {
  original: {
    id: "original",
    name: "Original",
    note: "Green apple & lemon",
    palette: { body: "#3E5A2C", deep: "#26381A", ink: "#F4EEDF", accent: "#E7A33E" },
  },
  mint: {
    id: "mint",
    name: "Mint Lime",
    note: "Cool mint & lime zest",
    palette: { body: "#5E7F4A", deep: "#3A5530", ink: "#F6F2E6", accent: "#F2D27A" },
  },
  berry: {
    id: "berry",
    name: "Tart Berry",
    note: "Tart cherry & blackberry",
    palette: { body: "#7C3246", deep: "#521E2E", ink: "#F8EEE6", accent: "#F0A58B" },
  },
  reds: {
    id: "reds",
    name: "Beet & Berry",
    note: "Beet, cherry & hibiscus",
    palette: { body: "#9A3B3A", deep: "#62211F", ink: "#FAEFE6", accent: "#F2C07A" },
  },
  protein: {
    id: "protein",
    name: "Vanilla Oat",
    note: "Vanilla bean & oat",
    palette: { body: "#D9C7A2", deep: "#B39F78", ink: "#2B2A20", accent: "#3E5A2C" },
  },
  minerals: {
    id: "minerals",
    name: "Sea Salt Citrus",
    note: "Sea salt & citrus",
    palette: { body: "#E3D6B8", deep: "#C2B18D", ink: "#2B2A20", accent: "#C9643B" },
  },
};

/** The three Daily Greens flavours, in menu order. */
export const greensFlavours: FlavourId[] = ["original", "mint", "berry"];
