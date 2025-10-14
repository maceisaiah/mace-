import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "p01",
    slug: "nocturne-hoodie",
    name: "Nocturne Hoodie",
    shortDescription: "Heavyweight hoodie – matte black, cyber-noir cut.",
    description:
      "A heavyweight fleece hoodie with a structured silhouette. Subtle gloss print, reinforced seams, and a shadow-black finish.",
    priceCents: 8900,
    image: "/products/nocturne-hoodie.jpg",
    colors: ["Shadow Black", "Graphite"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p02",
    slug: "umbra-tee",
    name: "Umbra Tee",
    shortDescription: "Oversized tee – muted blue-black with soft hand.",
    description:
      "An ultra-soft cotton tee in a deep blue-black tone. Minimal chest mark. Designed for drape and comfort.",
    priceCents: 3800,
    image: "/products/umbra-tee.jpg",
    colors: ["Blue-Black", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p03",
    slug: "veil-cap",
    name: "Veil Cap",
    shortDescription: "6‑panel cap – low profile, matte hardware.",
    description:
      "A low-profile cap with matte metal hardware and tonal embroidery. Adjustable strap. Weathered charcoal.",
    priceCents: 2600,
    image: "/products/veil-cap.jpg",
    colors: ["Charcoal"],
    sizes: ["OS"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}


