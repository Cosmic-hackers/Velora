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
    id: "post-1",
    slug: "on-reduction-and-proportion",
    title: "On Reduction & Proportion",
    category: "MANIFESTO",
    date: "NOVEMBER 2024",
    readTime: "4 MIN READ",
    excerpt: "Why the modern silhouette commands quiet presence rather than ornament. The philosophy behind our unlined coats.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=85&w=1400&auto=format&fit=crop",
    content: `
      In an era dominated by rapid synthetic cycles and visual cacophony, genuine elegance resides in what is withheld.

      When we began sketching the autumn collection in our studio, the primary instruction was simple: strip away every superfluous seam, decorative lining, and external emblem until only the pure geometry of the garment remains.

      A double-faced merino wool overcoat cut with architectural drop shoulders does not require embellishment. The density of the Australian fiber (820 GSM) holds its own sculptural column. As the wearer walks, the unlined interior floats naturally across the body.

      This is the essence of reduction: style that survives decades because it was never tied to a trend.
    `,
  },
  {
    id: "post-2",
    slug: "the-art-of-mongolian-cashmere",
    title: "The Harvest of Mongolian Cashmere",
    category: "SOURCING",
    date: "OCTOBER 2024",
    readTime: "6 MIN READ",
    excerpt: "Journeying to the high steppes of Inner Mongolia to document the ethical comb-harvest of 15.5-micron fibers.",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=85&w=1400&auto=format&fit=crop",
    content: `
      The finest cashmere in the world cannot be mass-produced in factories. It begins in the sub-zero winters of the Alashan plateau, where free-roaming nomadic herders have tended native Capra hircus goats for centuries.

      In spring, as temperatures rise, the goats shed their soft underfleece naturally. Rather than shearing, the fibers are gently comb-harvested by hand, yielding fibers with an average diameter of 15.5 microns.

      These unspun clouds of raw cashmere are transported to heritage Scottish spinning mills, where pure spring water removes natural oils without harsh chemical detergents. The result is a knit that softens with each wear.
    `,
  },
  {
    id: "post-3",
    slug: "the-permanent-wardrobe",
    title: "The Permanent Wardrobe",
    category: "ATELIER",
    date: "SEPTEMBER 2024",
    readTime: "5 MIN READ",
    excerpt: "Seven foundational pieces that form an inexhaustible lifetime uniform. How to build lasting wardrobe permanence.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=85&w=1400&auto=format&fit=crop",
    content: `
      Building a permanent wardrobe is an act of curation. It begins with identifying pieces that seamlessly interact across seasons.

      A structured peak-lapel blazer in midnight virgin wool pairs with heavy Supima t-shirts during temperate afternoons, and layers under an atelier overcoat when winter descends.

      When every item in your closet is held to the highest standard of fabric integrity, dressing becomes effortless.
    `,
  },
];

