export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string;
}

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: "post-featured",
    slug: "the-season-of-refinement",
    title: "The Season of Refinement",
    category: "FEATURED STORY",
    date: "MAR 20, 2025",
    readTime: "5 MIN READ",
    excerpt: "Transitional layers, enduring fabrics, and the quiet power of thoughtful design.",
    image: "/images/journal/journal-featured-season.jpg",
    content: `
      In an era dominated by rapid synthetic cycles and visual cacophony, genuine elegance resides in what is withheld.

      Transitional layering demands unyielding attention to fiber integrity. When constructing pieces for unpredictable temperatures, our focus turns to unlined double-faced virgin wools, featherweight cashmere knits, and unstructured poplin foundations.

      A double-faced overcoat cut with architectural drop shoulders does not require embellishment. The natural drape holds its own sculptural column. As the wearer moves, the unlined interior floats naturally across the body.

      This is the essence of refinement: style that survives decades because it was never tied to a fleeting trend.
    `,
  },
  {
    id: "post-1",
    slug: "layering-with-intention",
    title: "Layering with Intention",
    category: "FASHION",
    date: "MAR 12, 2025",
    readTime: "4 MIN READ",
    excerpt: "Thoughtful silhouettes and breathable layers crafted for seamless seasonal transitions.",
    image: "/images/journal/story-layering.jpg",
    content: `
      Layering is not simply adding warmth; it is a composition in depth and tactile contrast.

      Pairing a crisp silk-cotton tunic beneath an open-weave knit allows subtle texture interplay while preserving an effortless silhouette. When garments are designed with shared proportions, layering feels innate rather than forced.
    `,
  },
  {
    id: "post-2",
    slug: "modern-masculinity",
    title: "A Conversation on Modern Masculinity",
    category: "PEOPLE",
    date: "MAR 5, 2025",
    readTime: "6 MIN READ",
    excerpt: "Redefining everyday tailoring through softness, comfort, and unpretentious structure.",
    image: "/images/journal/story-masculinity.jpg",
    content: `
      Modern tailoring discards rigid shoulder padding in favor of natural drape.

      A relaxed wool jacket paired with fluid trousers commands authority through ease rather than constriction. We speak with our master tailors about crafting pieces for men who value quiet presence above loud declarations.
    `,
  },
  {
    id: "post-3",
    slug: "the-spaces-that-inspire-us",
    title: "The Spaces That Inspire Us",
    category: "CULTURE",
    date: "FEB 28, 2025",
    readTime: "5 MIN READ",
    excerpt: "Architectural purity, natural sunlight, and the quiet geometry that shapes our atelier.",
    image: "/images/journal/story-spaces.jpg",
    content: `
      Architecture and garment construction share the same pursuit: creating sanctuary through clean lines and natural light.

      From limestone colonnades to sunlit travertine steps, our design studio draws inspiration from spaces where material purity speaks louder than decorative noise.
    `,
  },
  {
    id: "post-4",
    slug: "on-reduction-and-proportion",
    title: "On Reduction & Proportion",
    category: "MANIFESTO",
    date: "NOVEMBER 2024",
    readTime: "4 MIN READ",
    excerpt: "Why the modern silhouette commands quiet presence rather than ornament. The philosophy behind our unlined coats.",
    image: "/images/journal/explore-fashion.jpg",
    content: `
      When we began sketching the collection in our studio, the primary instruction was simple: strip away every superfluous seam, decorative lining, and external emblem until only the pure geometry of the garment remains.
    `,
  },
  {
    id: "post-5",
    slug: "the-art-of-mongolian-cashmere",
    title: "The Harvest of Mongolian Cashmere",
    category: "SOURCING",
    date: "OCTOBER 2024",
    readTime: "6 MIN READ",
    excerpt: "Journeying to the high steppes of Inner Mongolia to document the ethical comb-harvest of 15.5-micron fibers.",
    image: "/images/journal/explore-craftsmanship.jpg",
    content: `
      The finest cashmere in the world begins in the sub-zero winters of the Alashan plateau, where free-roaming nomadic herders have tended native Capra hircus goats for centuries.
    `,
  },
];
