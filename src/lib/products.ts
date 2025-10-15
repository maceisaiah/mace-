import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "art-in-motion-hoodie",
    slug: "art-in-motion-hoodie",
    name: "ART IN MOTION Hoodie",
    shortDescription: "Distressed black hoodie with vintage wash and graffiti-style design.",
    description:
      "Distressed black hoodie with vintage wash featuring 'ART IN MOTION' graphic on the front and vibrant graffiti-style emoji design on the back. Features paint splatter details and oversized fit for the creative rebel.",
    priceCents: 3500,
    image: "/products/art-in-motion-hoodie.jpg",
    colors: ["Black"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: "graffiti-rebel-hoodie",
    slug: "graffiti-rebel-hoodie", 
    name: "Graffiti Rebel Hoodie",
    shortDescription: "Urban streetwear hoodie with bold graffiti-inspired graphics.",
    description:
      "Bold graffiti-inspired hoodie featuring vibrant street art graphics. Perfect for the urban creative who isn't afraid to make a statement.",
    priceCents: 3800,
    image: "/products/graffiti-rebel-hoodie.jpg",
    colors: ["Black"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
  },
  {
    id: "nocturne-hoodie",
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
    id: "umbra-tee",
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
    id: "veil-cap",
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


